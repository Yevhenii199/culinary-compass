-- Drop the bookings table and all its dependencies
DROP TABLE IF EXISTS public.bookings CASCADE;

-- Drop the booking_status enum if it's no longer needed
-- Note: Only drop if no other tables use this enum
-- DO $$ 
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM pg_type t 
--     JOIN pg_enum e ON t.oid = e.enumtypid 
--     WHERE t.typname = 'booking_status'
--   ) THEN
--     DROP TYPE IF EXISTS public.booking_status;
--   END IF;
-- END $$;

-- Note: The has_role function and app_role enum are kept as they may be used
-- for other admin features in the application (user management, etc.)