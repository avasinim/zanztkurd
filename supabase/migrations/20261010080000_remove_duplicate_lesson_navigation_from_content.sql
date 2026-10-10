-- Navigation belongs to the lesson page shell, not lesson_content.
-- Remove duplicated navigation markup from stored lesson bodies so the
-- previous/next links are rendered exactly once.
UPDATE public.lesson_content
SET content_html = regexp_replace(
  content_html,
  '<nav\s+[^>]*class="lesson-nav"[^>]*>.*?</nav>',
  '',
  'gis'
)
WHERE content_html ~* '<nav\s+[^>]*class="lesson-nav"';
