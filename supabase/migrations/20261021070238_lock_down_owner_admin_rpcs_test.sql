-- Test project only: explicitly remove anon execution, even if project defaults grant it.
revoke all on function public.admin_list_users() from anon, public;
revoke all on function public.admin_list_enrollments() from anon, public;
revoke all on function public.admin_list_progress() from anon, public;
revoke all on function public.admin_set_enrollment_status(uuid, text, text) from anon, public;
grant execute on function public.admin_list_users() to authenticated;
grant execute on function public.admin_list_enrollments() to authenticated;
grant execute on function public.admin_list_progress() to authenticated;
grant execute on function public.admin_set_enrollment_status(uuid, text, text) to authenticated;
