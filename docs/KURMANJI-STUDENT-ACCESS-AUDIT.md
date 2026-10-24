# Kurmanji student enrollment access audit — 2026-10-24

## Finding

The deployed `dashboard.html` configuration listed only the general Kurdish writing course (`orthography-kurdik`, 26 lessons) and general phonetics/phonology course (`phonetics-phonology-kurdik`, 32 lessons). It did not expose the Kurmanji courses (`kurmanji-course-1`, 26 lessons; `kurmanji-course-2`, 12 lessons) through the student's self-enrollment interface.

The lesson gate requires an authenticated session, active enrollment in the matching course, and sequential completion before later lessons can open. A student who followed a Kurmanji lesson link without enrollment was sent to `dashboard.html?enroll=required`, but the dashboard offered no Kurmanji enrollment buttons. This was a definite student journey gap, independent of the separate live Auth/RLS acceptance-test gap.

## Safe branch fix

On `kurmanji-clean-release`, `dashboard.html` now includes enrollment/progress cards for both Kurmanji courses, uses the matching course IDs in `enroll_in_course`, links to the corresponding course plans, and counts progress using the official Kurmanji lesson keys. General course IDs and their progress logic are retained.

The protected lesson gate now preserves the requested course ID in the redirect (`dashboard.html?enroll=required&course=kurmanji-course-1`, or course 2), and the dashboard scrolls to and highlights that exact Kurmanji enrollment card. This prevents a learner who clicked a Kurmanji lesson from being left to guess which course to enroll in or following the unrelated central-circle/general-course route.

A static regression guard was added to `scripts/validate_kurmanji_package.py` to check both course IDs/totals, both enrollment-card IDs, the requested-course selection/scroll behavior, and the course-preserving lesson redirect. GitHub Actions run [40096807490](https://github.com/avasinim/zanztkurd/actions/runs/40096807490) passed for commit `cad470495d70ab4ed533e4dc254744067df831ea`.

## Release limitations

- This change is on `kurmanji-clean-release` only. It has not been merged to `main` or deployed.
- No Supabase database, migration history, or production data was changed.
- Before release, confirm the target database contains the two Kurmanji course records and required RPCs, and run a disposable authenticated-browser test covering signup/sign-in, enrollment, opening lesson 1, completing it, unlocking lesson 2, and denying lesson 2 before lesson 1 is completed.
- The existing CI workflow validates package integrity and mocked browser behavior; it does not substitute for a real authenticated browser test against the target Supabase project.
