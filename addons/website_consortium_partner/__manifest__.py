{
    'name': 'Consortium Partner',
    'category': 'Website/Partner',
    'sequence': 1,
    'website': '',
    'summary': 'Publish website consortium partner',
    'version': '1.0',
    'author': 'Shehabul',
    'description': 'A consortium partner consists of a number of organisations that are working in a particular project funded by as an example European Commission, Innovate UK, etc. The consortium partner should include, name of the organisation, organisation logo, organisation website link, short bio of the organisation and their activities covered in the project',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/website_consortium_partner_views.xml',
        'views/snippets/snippets.xml',
        'views/snippets/s_consortium_partner.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'website_consortium_partner/static/src/scss/styles.scss',
            'website_consortium_partner/static/src/snippets/s_consortium_partner/000.js',
            'website_consortium_partner/static/src/snippets/s_consortium_partner/options.js',
        ],
        'web.assets_primary_variables': [
        ],
    },
}
