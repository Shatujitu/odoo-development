odoo.define('website_tvs_domain.s_domains_frontend', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');
    const DynamicSnippet = require('website.s_dynamic_snippet');

    const DynamicSnippetDomains = DynamicSnippet.extend({
        selector: '.s_dynamic_snippet_domains',
        disabledInEditableMode: false,

        //--------------------------------------------------------------------------
        // Private
        //--------------------------------------------------------------------------

        events: {
            'click .toggle-description': '_onClickToggleDescription',
        },

        _onClickToggleDescription: function (ev) {
            ev.preventDefault();
            let $shortDescription = this.$('.short-description');
            let $fullDescription = this.$('.full-description');
            let $shortDescriptionContent = this.$('.short-description-content');

            if ($fullDescription.hasClass('d-none')) {
                // Show full description
                $shortDescription.addClass('d-none');
                $fullDescription.removeClass('d-none');
                $shortDescriptionContent.hide(); // Hide short description content
                $(ev.currentTarget).text("View Less " + '\u2191');
            } else {
                // Show short description
                $fullDescription.addClass('d-none');
                $shortDescription.removeClass('d-none');
                $shortDescriptionContent.show(); // Show short description content
                $(ev.currentTarget).text("View More " + '\u2193');
            }
        },

        /**
         * Method to be overridden in child components in order to provide a search
         * domain if needed.
         * @override
         * @private
         */
        _getSearchDomain: function () {
            const searchDomain = this._super.apply(this, arguments);
            const filterByDomainId = parseInt(this.$el.get(0).dataset.filterByDomainId);
            if (filterByDomainId >= 0) {
                // searchDomain.push(['sub_domain_ids', 'in', parseInt(filterByDomainId)]);
                searchDomain.push(['id', '=', filterByDomainId]);
            }
            return searchDomain;
        },
    });
    publicWidget.registry.domains = DynamicSnippetDomains;

    return DynamicSnippetDomains;
});
