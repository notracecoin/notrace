-- Blog Admin Panel Migration
-- Creates blog_posts table with all required fields

-- 1. Create post status enum
DROP TYPE IF EXISTS public.post_status CASCADE;
CREATE TYPE public.post_status AS ENUM ('draft', 'published');

-- 2. Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content JSONB NOT NULL DEFAULT '{}',
    cover_image TEXT,
    cover_image_alt TEXT,
    author TEXT NOT NULL DEFAULT 'Admin',
    category TEXT,
    read_time TEXT,
    status public.post_status DEFAULT 'draft'::public.post_status,
    featured BOOLEAN DEFAULT false,
    -- SEO fields
    meta_title TEXT,
    meta_description TEXT,
    keywords TEXT,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    -- Article schema
    article_schema JSONB,
    -- Timestamps
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at);

-- 4. Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 5. Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
-- Public can read published posts
DROP POLICY IF EXISTS "public_read_published_posts" ON public.blog_posts;
CREATE POLICY "public_read_published_posts"
ON public.blog_posts
FOR SELECT
TO public
USING (status = 'published'::public.post_status);

-- Authenticated users (admin) can do everything
DROP POLICY IF EXISTS "admin_all_blog_posts" ON public.blog_posts;
CREATE POLICY "admin_all_blog_posts"
ON public.blog_posts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 7. Trigger for updated_at
DROP TRIGGER IF EXISTS blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_blog_posts_updated_at();

-- 8. Create admin user for the backpanel
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
BEGIN
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES (
        admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'manisha@notrace.co.in', crypt('9721226881', gen_salt('bf', 10)), now(), now(), now(),
        jsonb_build_object('full_name', 'Manisha', 'role', 'admin'),
        jsonb_build_object('provider', 'email', 'providers', ARRAY['email']::TEXT[]),
        false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null
    )
    ON CONFLICT (id) DO NOTHING;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Admin user creation skipped: %', SQLERRM;
END $$;

-- 9. Sample blog posts
DO $$
BEGIN
    INSERT INTO public.blog_posts (
        title, slug, excerpt, content, cover_image, cover_image_alt,
        author, category, read_time, status, featured,
        meta_title, meta_description, keywords,
        og_title, og_description, og_image,
        published_at
    ) VALUES (
        'Remember When Tech Did Not Try to Steal Your Soul?',
        'remember-when-tech-didnt-steal-your-soul',
        'There is a strange agreement we have all been forced into. Whether you are a college student scrolling TikTok until 3 AM or a seasoned adult trying to find your glasses in the dark, you download a simple phone tool and suddenly you are handing over your entire life story.',
        '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"There is a strange agreement we have all been forced into."}]}]}',
        'https://img.rocket.new/generatedImages/rocket_gen_img_132b6a6ee-1773051894819.png',
        'Dark smartphone screen with privacy lock icon',
        'Mohit Kanaujia',
        'Privacy',
        '7 min read',
        'published'::public.post_status,
        true,
        'Remember When Tech Did Not Try to Steal Your Soul? — notrace',
        'Exploring how everyday apps secretly harvest your data and what we can do about it.',
        'privacy, data harvesting, app transparency, digital rights',
        'Remember When Tech Did Not Try to Steal Your Soul?',
        'Exploring how everyday apps secretly harvest your data.',
        'https://img.rocket.new/generatedImages/rocket_gen_img_132b6a6ee-1773051894819.png',
        now()
    ) ON CONFLICT (slug) DO NOTHING;

    INSERT INTO public.blog_posts (
        title, slug, excerpt, content, cover_image, cover_image_alt,
        author, category, read_time, status, featured,
        meta_title, meta_description, keywords,
        og_title, og_description, og_image,
        published_at
    ) VALUES (
        'The Flashlight App That Reported Your Location to 14 Ad Networks',
        'flashlight-app-location-ad-networks',
        'In 2013, the FTC settled with Goldenshores Technologies over the Brightest Flashlight Free app. The details are more disturbing than you would expect and the practice is still happening.',
        '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"In 2013, the FTC settled with Goldenshores Technologies."}]}]}',
        'https://img.rocket.new/generatedImages/rocket_gen_img_16ef74aa6-1784419446326.png',
        'Flashlight beam in dark room, investigative tone',
        'Marcus Webb',
        'FTC Cases',
        '8 min read',
        'published'::public.post_status,
        false,
        'The Flashlight App That Reported Your Location to 14 Ad Networks — notrace',
        'How a simple flashlight app secretly sent your location to 14 advertising networks.',
        'FTC, flashlight app, location tracking, ad networks, privacy violation',
        'The Flashlight App That Reported Your Location to 14 Ad Networks',
        'How a simple flashlight app secretly sent your location to 14 advertising networks.',
        'https://img.rocket.new/generatedImages/rocket_gen_img_16ef74aa6-1784419446326.png',
        now()
    ) ON CONFLICT (slug) DO NOTHING;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Sample posts insertion skipped: %', SQLERRM;
END $$;
