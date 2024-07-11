odoo.define('website_tvs_domain.s_topics_frontend', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');
    const DynamicSnippet = require('website.s_dynamic_snippet');

    const DynamicSnippetTopics = DynamicSnippet.extend({
        selector: '.s_dynamic_snippet_topics',
        disabledInEditableMode: false,

        //--------------------------------------------------------------------------
        // Private
        //--------------------------------------------------------------------------

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
                searchDomain.push(['domain_ids', '=', filterByDomainId]);
            }
            return searchDomain;
        },

    });
    publicWidget.registry.topics = DynamicSnippetTopics;

    return DynamicSnippetTopics;
});
