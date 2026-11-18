#!/usr/bin/env python3
"""Static integrity checks for the Kurmanji lesson package; never edits lesson text."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SEED_DIR = ROOT / "docs"
ERRORS = []

expected = {
    "kurmanji-course-1": 26,
    "kurmanji-course-2": 12,
}

seed_files = sorted(SEED_DIR.glob("kurmanji-content-seed-part-*.sql"))
if not seed_files:
    ERRORS.append("No Kurmanji seed SQL files found under docs/")

seed_text = "\n".join(path.read_text(encoding="utf-8") for path in seed_files)

# Split SQL files are historical/draft snapshots, never canonical production
# migrations. Preserve an explicit warning in every file header.
for seed_path in seed_files:
    seed_head = seed_path.read_text(encoding="utf-8")[:1200]
    if "DRAFT DATA SEED" not in seed_head or "not a production migration" not in seed_head:
        ERRORS.append(
            f"Kurmanji split seed must retain its DRAFT DATA SEED / not-production warning: {seed_path.name}"
        )

# Guard the migration's known cross-course invariants. These checks are static;
# they do not apply SQL or claim to replace a disposable-database test.
migration_path = ROOT / "supabase" / "migrations" / "20261019090000_add_kurmanji_courses_and_protected_lessons.sql"
if not migration_path.exists():
    ERRORS.append("Missing Kurmanji course-content migration")
else:
    migration_text = migration_path.read_text(encoding="utf-8")
    for required in (
        "SET total_lessons = 32",
        "p_course_id = 'orthography-kurdik' OR NOT public.is_site_owner()",
        "REVOKE ALL ON FUNCTION public.can_read_lesson_content(text,text) FROM PUBLIC, anon",
        "REVOKE ALL ON FUNCTION public.complete_lesson(text,text) FROM PUBLIC, anon",
        "SET search_path TO ''",
    ):
        if required not in migration_text:
            ERRORS.append(f"Kurmanji migration is missing a required safety invariant: {required}")
    stale_source_url = "https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf"
    if stale_source_url in migration_text or stale_source_url in seed_text:
        ERRORS.append("A moved Bamberg grammar PDF URL remains in the migration or seed package")
    for course_id, count in expected.items():
        for number in range(1, count + 1):
            key = f"{course_id}-lesson-{number:02d}.html"
            row_pattern = re.compile(r"\(['\"]" + re.escape(key) + r"['\"]\s*,")
            if len(row_pattern.findall(migration_text)) != 1:
                ERRORS.append(f"Migration must contain exactly one content row for {key}")

# Validate the latest checked-in migration's server-side access and completion
# RPCs as well as the browser guard. The older 20261019090000 migration is not
# the final definition after the later 20261024122051 replacement.
latest_migration_path = (
    ROOT / "supabase" / "migrations"
    / "20261024122051_add_kurmanji_courses_and_protected_lessons.sql"
)
if not latest_migration_path.exists():
    ERRORS.append("Missing latest Kurmanji access-control migration")
else:
    latest_sql = latest_migration_path.read_text(encoding="utf-8")
    # The latest migration is canonical. Draft split seeds provide key coverage
    # only; their body text is intentionally not compared as authoritative.
    for course_id, count in expected.items():
        for number in range(1, count + 1):
            key = f"{course_id}-lesson-{number:02d}.html"
            row_pattern = re.compile(r"\(['\"]" + re.escape(key) + r"['\"]\s*,")
            row_count = len(row_pattern.findall(latest_sql))
            if row_count != 1:
                ERRORS.append(
                    f"Latest migration must contain exactly one canonical content row for {key}; found {row_count}"
                )
    read_match = re.search(
        r"CREATE OR REPLACE FUNCTION public\.can_read_lesson_content\b.*?\$function\$;",
        latest_sql,
        re.I | re.S,
    )
    complete_match = re.search(
        r"CREATE OR REPLACE FUNCTION public\.complete_lesson\b.*?\$function\$;",
        latest_sql,
        re.I | re.S,
    )
    if not read_match:
        ERRORS.append("Latest Kurmanji migration is missing can_read_lesson_content")
    else:
        read_sql = read_match.group(0)
        for required in (
            "generate_series(1,32)",
            "generate_series(1,26)",
            "generate_series(1,12)",
            "array_position(lesson_order, p_lesson_key)",
            "IF lesson_index IS NULL THEN RETURN false",
            "public.is_site_owner()",
            "public.enrollments",
            "public.lesson_progress",
        ):
            if required not in read_sql:
                ERRORS.append(
                    f"Latest lesson-read RPC is missing access/order invariant: {required}"
                )
    if not complete_match:
        ERRORS.append("Latest Kurmanji migration is missing complete_lesson")
    else:
        complete_sql = complete_match.group(0)
        for required in (
            "array_position(lesson_order, p_lesson_key)",
            "IF lesson_index IS NULL THEN RAISE EXCEPTION 'INVALID_LESSON'",
            "PREVIOUS_LESSON_REQUIRED",
            "INSERT INTO public.lesson_progress",
            "public.enrollments",
        ):
            if required not in complete_sql:
                ERRORS.append(
                    f"Latest lesson-completion RPC is missing validation invariant: {required}"
                )

# Check that the shared script retains the canonical Avasin mappings for static
# site UI while protecting authored, server-loaded lesson content from rewriting.
# Browser regression coverage below exercises dynamically inserted lesson HTML.
shared_script = ROOT / "script.js"
if not shared_script.exists():
    ERRORS.append("Missing shared access-control script: script.js")
else:
    script_text = shared_script.read_text(encoding="utf-8")
    # Keep the spelling map for eligible static UI text, but never apply it to
    # the authored .lesson-content subtree.
    for required in (
        '[/نووسراوە/g,"نوسراوە"]',
        '[/نووسینی/g,"نوسینی"]',
        '[/نووسین/g,"نوسین"]',
        '[/فێربوون/g,"فێربون"]',
        '[/هەموو/g,"هەمو"]',
        '[/نموونە/g,"نمونە"]',
        '[/پێویست/g,"پەیویست"]',
        '[/ڕوون/g,"ڕون"]',
        '[/ناوەڕۆک/g,"نێوەڕۆک"]',
        '[/چییە/g,"چیە"]',
        '[/نییە/g,"نیە"]',
        'const isLessonContentNode = node =>',
        'element.matches(".lesson-content") || element.closest(".lesson-content")',
        'if(isLessonContentNode(node) ||',
        'if(isLessonContentNode(el)) return;',
        'if(!isLessonContentNode(n) &&',
        'if(!isLessonContentNode(node) &&',
        'node.nodeType===Node.ELEMENT_NODE && !isLessonContentNode(node)',
    ):
        if required not in script_text:
            ERRORS.append(f"Shared Avasin normalizer is missing required spelling mapping: {required}")
    if "if(index===-1)return false;" not in script_text:
        ERRORS.append("Browser lesson gate must reject unknown lesson keys")
    for required in (
        'Array.from({length:26},(_,i)=>"kurmanji-course-1-lesson-"',
        'Array.from({length:12},(_,i)=>"kurmanji-course-2-lesson-"',
    ):
        if required not in script_text:
            ERRORS.append(f"Browser lesson order is missing expected Kurmanji sequence: {required}")

    if 'Avasin access gate' not in script_text:
        ERRORS.append("Shared access-control gate marker is missing from script.js")

    # Keep the Kurmanji browser gate and server-authoritative completion path
    # covered by CI, not just the static HTML files.
    for required in (
        'kurmanji-course-1-lesson-',
        'kurmanji-course-2-lesson-',
        'can_read_lesson_content',
        'complete_lesson',
        'ZANSTI_SYNC_PROGRESS',
        'markLessonComplete',
        'kurmanji-completion-gate',
    ):
        if required not in script_text:
            ERRORS.append(f"Kurmanji runtime gate is missing required integration: {required}")
    if 'length:26' not in script_text and 'length: 26' not in script_text:
        ERRORS.append("Kurmanji Course 1 gate is not configured for 26 lessons")
    if 'length:12' not in script_text and 'length: 12' not in script_text:
        ERRORS.append("Kurmanji Course 2 gate is not configured for 12 lessons")


# Keep the student enrollment handoff course-specific. These static checks
# catch regressions where a protected Kurmanji lesson drops the requested
# course or the dashboard no longer exposes/focuses the matching enrollment card.
dashboard_path = ROOT / "dashboard.html"
if not dashboard_path.exists():
    ERRORS.append("Missing student dashboard: dashboard.html")
else:
    dashboard_html = dashboard_path.read_text(encoding="utf-8")
    for required in (
        "kurmanji1:{id:'kurmanji-course-1',total:26",
        "kurmanji2:{id:'kurmanji-course-2',total:12",
        'id="kurmanji1Enroll"',
        'id="kurmanji2Enroll"',
        "requestedCourse==='kurmanji-course-1'?'kurmanji1Enroll'",
        "requestedCourse==='kurmanji-course-2'?'kurmanji2Enroll'",
        "card.scrollIntoView({behavior:'smooth',block:'center'})",
    ):
        if required not in dashboard_html:
            ERRORS.append(f"Student dashboard is missing Kurmanji enrollment routing/card behavior: {required}")

if not shared_script.exists():
    pass
else:
    for required in (
        'const courseParam=encodeURIComponent(courseId);',
        'location.href=dashboardPath+"?enroll=required&course="+courseParam;',
    ):
        if required not in script_text:
            ERRORS.append(f"Protected lesson redirect is not preserving course context: {required}")

for course_id, count in expected.items():
    expected_names = {
        f"{course_id}-lesson-{number:02d}.html"
        for number in range(1, count + 1)
    }
    found_pages = sorted(ROOT.glob(f"{course_id}-lesson-*.html"))
    actual_names = {path.name for path in found_pages}

    for missing in sorted(expected_names - actual_names):
        ERRORS.append(f"Missing lesson page: {missing}")
    for unexpected in sorted(actual_names - expected_names):
        ERRORS.append(f"Unexpected lesson page: {unexpected}")

    for number in range(1, count + 1):
        key = f"{course_id}-lesson-{number:02d}.html"
        page = ROOT / key
        if page.exists():
            html = page.read_text(encoding="utf-8")
            if f'data-lesson-key="{key}"' not in html:
                ERRORS.append(f"Lesson page has missing/mismatched data-lesson-key: {key}")
            if not re.search(r'<script\b[^>]*src=["\'][^"\']*script\.js(?:\?[^"\']*)?["\']', html, re.I):
                ERRORS.append(f"Lesson page does not load the shared access-control script: {key}")
            if not re.search(r'<meta\s+name=["\']robots["\']\s+content=["\']noindex,follow["\']', html, re.I):
                ERRORS.append(f"Lesson page is missing noindex,follow metadata: {key}")
            content_box = re.search(
                r'<div\s+class=["\']lesson-content["\'][^>]*>(.*?)</div>',
                html,
                re.I | re.S,
            )
            if not content_box:
                ERRORS.append(f"Lesson page is missing the server-loaded content container: {key}")
            elif not any(phrase in content_box.group(1) for phrase in ("بارکردنی نێوەڕۆکی وانەکە", "بارکردنی ناوەڕۆکی وانەکە", "نێوەڕۆکی وانە بار دەکرێت")):
                ERRORS.append(f"Lesson page content container does not use the expected loading placeholder: {key}")

            # Validate actual previous/next links, not just the presence of page files.
            actions = re.search(
                r'<(?:div|nav)\s+class=["\']klesson-actions["\'][^>]*>(.*?)</(?:div|nav)>',
                html,
                re.I | re.S,
            )
            if not actions:
                ERRORS.append(f"Lesson page is missing its lesson navigation actions: {key}")
            else:
                nav_links = re.findall(r'href=["\']([^"\']+)["\']', actions.group(1), re.I)
                lesson_links = [
                    href for href in nav_links
                    if re.fullmatch(re.escape(course_id) + r"-lesson-\d{2}\.html", href)
                ]
                expected_links = []
                if number > 1:
                    expected_links.append(f"{course_id}-lesson-{number - 1:02d}.html")
                if number < count:
                    expected_links.append(f"{course_id}-lesson-{number + 1:02d}.html")
                if lesson_links != expected_links:
                    ERRORS.append(
                        f"Incorrect previous/next lesson links for {key}: "
                        f"expected {expected_links}, found {lesson_links}"
                    )
                if any(
                    re.fullmatch(r"kurmanji-course-[12]-lesson-\d{2}\.html", href)
                    and not href.startswith(course_id + "-lesson-")
                    for href in nav_links
                ):
                    ERRORS.append(f"Lesson navigation crosses course boundaries: {key}")

        row_pattern = re.compile(r"\('" + re.escape(key) + r"'\s*,")
        row_count = len(row_pattern.findall(seed_text))
        if row_count != 1:
            ERRORS.append(
                f"Expected exactly one draft seed reference row for {key}; found {row_count}"
            )

# Course plan pages must link to every lesson once, in numeric order.
for course_id, count in expected.items():
    plan_path = ROOT / f"{course_id}.html"
    if not plan_path.exists():
        ERRORS.append(f"Missing course plan page: {plan_path.name}")
        continue
    plan_html = plan_path.read_text(encoding="utf-8")
    plan_links = re.findall(r'href=["\']([^"\']+)["\']', plan_html, re.I)
    actual_lesson_links = [
        href for href in plan_links
        if re.fullmatch(re.escape(course_id) + r"-lesson-\d{2}\.html", href)
    ]
    expected_lesson_links = [
        f"{course_id}-lesson-{number:02d}.html"
        for number in range(1, count + 1)
    ]
    if actual_lesson_links != expected_lesson_links:
        ERRORS.append(
            f"Course plan {plan_path.name} must link to all {count} lessons "
            "exactly once and in numeric order"
        )

# The north-circle UI must route to its own Kurmanji courses rather than
# leaving the general 58-lesson catalog visible.
catalog_path = ROOT / "lessons" / "catalog.html"
if not catalog_path.exists():
    ERRORS.append("Missing lesson catalog: lessons/catalog.html")
else:
    catalog_html = catalog_path.read_text(encoding="utf-8")
    for required in (
        'data-language="kurmanji-course-1"',
        'data-language="kurmanji-course-2"',
        'if(language==="kurmanji-course-1"){window.location.href="../kurmanji-course-1.html";return;}',
        'if(language==="kurmanji-course-2"){window.location.href="../kurmanji-course-2.html";return;}',
        'northChoices.hidden=language!=="north"',
        'const catalogHero=document.querySelector(".catalog-hero");',
        'const studentAccessStrip=document.querySelector(".student-access-strip");',
        'const catalogIntro=document.querySelector(".catalog-intro");',
        'const northOnly=language==="north";',
        'if(catalogHero)catalogHero.hidden=northOnly;',
        'if(studentAccessStrip)studentAccessStrip.hidden=northOnly;',
        'if(catalogIntro)catalogIntro.hidden=northOnly;',
        'catalogTools.hidden=true;catalog.hidden=true;overall.hidden=true;languageComing.hidden=true;',
        '.catalog-hero[hidden],.student-access-strip[hidden],.catalog-intro[hidden]',
    ):
        if required not in catalog_html:
            ERRORS.append(f"North-circle catalog navigation is missing required behavior: {required}")

learning_path = ROOT / "learning.html"
if not learning_path.exists():
    ERRORS.append("Missing learning pathway page: learning.html")
else:
    learning_html = learning_path.read_text(encoding="utf-8")
    for required in (
        'data-learning-region="north"',
        'data-learning-choice="kurmanji"',
        'data-learning-course="kurmanji-course-1"',
        'data-learning-course="kurmanji-course-2"',
        'id="learningKurmanjiCourses"',
        'const generalCurriculum=document.querySelector(".learning-lessons");',
        'if(generalCurriculum)generalCurriculum.hidden=region==="north"&&shouldOpen;',
        '.learning-lessons[hidden]{display:none!important}',
    ):
        if required not in learning_html:
            ERRORS.append(f"North-circle learning pathway is missing required selector: {required}")

# Student enrollment handoff must expose the Kurmanji courses and preserve course context
# in both delegated-link checks and the direct lesson-page gate.
dashboard_path = ROOT / "dashboard.html"
script_path = ROOT / "script.js"
if not dashboard_path.exists():
    ERRORS.append("Missing student dashboard: dashboard.html")
else:
    dashboard_html = dashboard_path.read_text(encoding="utf-8")
    for required in (
        "kurmanji1:{id:'kurmanji-course-1',total:26",
        "kurmanji2:{id:'kurmanji-course-2',total:12",
        'id="kurmanji1Enroll"',
        'id="kurmanji2Enroll"',
        "new URLSearchParams(location.search).get('course')",
        "card.scrollIntoView({behavior:'smooth',block:'center'})",
    ):
        if required not in dashboard_html:
            ERRORS.append(f"Student dashboard is missing Kurmanji enrollment handoff behavior: {required}")
if not script_path.exists():
    ERRORS.append("Missing shared access-control script: script.js")
else:
    script_html = script_path.read_text(encoding="utf-8")
    for required in (
        "const courseParam=encodeURIComponent(courseId);",
        'location.href=dashboardPath+"?enroll=required&course="+courseParam;',
        'location.replace(dashboardPath+"?enroll=required&course="+courseParam);',
    ):
        if required not in script_html:
            ERRORS.append(f"Protected lesson redirect does not preserve course context: {required}")
if ERRORS:
    print("\n".join(f"ERROR: {item}" for item in ERRORS))
    sys.exit(1)

print(
    "OK: all 38 Kurmanji lesson pages and canonical migration rows exist; "
    "draft seed files are explicitly non-production references with complete key coverage; "
    "lesson keys, shared access-control script, noindex metadata, server-loaded "
    "content placeholders, previous/next navigation, course boundaries, course-plan "
    "ordering, and Kurmanji runtime integration markers are consistent. "
    "Lesson content was not modified."
)
