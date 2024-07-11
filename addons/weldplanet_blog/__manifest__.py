{
    'name': 'Weldplanet Blogs',
    'category': 'Website/Blogs',
    'sequence': 4,
    'website': 'https://weldplanet.com',
    'summary': 'Extended version of website_blog depends on weldplanet design',
    'version': '1.0',
    'author': 'Shehabul',
    'description': 'Weldplanet custom design powered by TVS',
    'depends': ['base', 'website', 'website_blog'],
    'data': [
        'views/website_blog_extend_searchbox.xml',
        'views/website_blog_extend_components.xml',
        'views/website_blog_extend_posts_loop.xml',
        'views/website_blog_extend_templates.xml',
        'views/snippets/snippets.xml',
        'views/snippets/s_weldplanet_header.xml',
        'views/snippets/s_latest_blogs.xml',
    ],
    'assets': {
        'website.assets_wysiwyg': [],
        'website.assets_editor': [],
        'web.assets_tests': [],
        'web.assets_frontend': [
            'weldplanet_blog/static/src/scss/styles.scss',
        ],
        'web.assets_primary_variables': [],
    },
}
