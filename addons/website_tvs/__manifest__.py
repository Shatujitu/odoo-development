# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'TVS Website',
    'category': 'Website/Website',
    'sequence': 1,
    'website': 'https://technovativesolutions.co.uk',
    'summary': 'Publish domains, events and blogs',
    'version': '1.0',
    'author': 'Shehabul',
    'depends': ['base', 'website', 'website_tvs_domain', 'website_tvs_event', 'website_tvs_blog'],
    'data': [
    ],
    'demo': [
    ],
    'installable': True,
    'application': False,
    'assets': {
        'website.assets_wysiwyg': [
        ],
        'website.assets_editor': [
        ],
        'web.assets_tests': [
        ],
        'web.assets_frontend': [
        ],
    },
    # 'license': 'LGPL-3',
}
