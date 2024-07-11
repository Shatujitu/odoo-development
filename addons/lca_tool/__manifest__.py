{
    'name': 'LCA Tool',
    'category': 'Website',
    'sequence': 1,
    'version': '1.0.0',
    'author': "Technovative Solutions Ltd.",
    'website': "https://www.technovativesolutions.co.uk",
    'depends': ['website'],
    'summary': 'A generic platform for Life-Cycle Assessment analysis',
    'description': """This application provide all the features to create LCA model and perform analysis.
                    Create product assembly,
                    Create product sub-assembly,
                    Run Life-Cycle Assessment
                    """,
    'application': True,
    'installable': True,
    'auto_install': False,
    'data': [
        'views/lca_menus.xml',
        'views/lca_templates.xml',
        'views/res_config_settings_view.xml'
    ],
    'assets': {
        'web.assets_frontend': [
            'lca_tool/static/src/assets/**/*',
        ],
        'web.assets_backend': [
            'lca_tool/static/src/**/*',
        ],
        'lca_tool.assets_lca': [
            'lca_tool/static/src/components/lca_base/**/*',
            'lca_tool/static/src/components/lca_basic_data/**/*',
            'lca_tool/static/src/components/lca_modelling/**/*',
            'lca_tool/static/src/components/lca_report/**/*',
        ],
    },
}
