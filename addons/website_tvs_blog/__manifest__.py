{
    'name': 'TVS Blogs',
    'category': 'Website/Blogs',
    'sequence': 4,
    'website': '',
    'summary': 'Publish tvs website blogs/news',
    'version': '1.0',
    'author': 'Shehabul',
    'description': 'tvs website blog view',
    'depends': ['base', 'website', 'website_blog'],
    'data': [
        # 'views/snippets/snippets.xml',
        'views/snippets/s_latest_blogs.xml',
    ],
    'assets': {
        'website.assets_wysiwyg': [],
        'website.assets_editor': [],
        'web.assets_tests': [],
        'web.assets_frontend': [
            'website_tvs_blog/static/src/scss/styles.scss',
        ],
        'web.assets_primary_variables': [],
    },
}
