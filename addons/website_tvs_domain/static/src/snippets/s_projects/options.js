odoo.define('website_tvs_domain.s_projects_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');
    const dynamicSnippetOptions = require('website.s_dynamic_snippet_options');

    var wUtils = require('website.utils');

    const dynamicSnippetProjectsOptions = dynamicSnippetOptions.extend({
        /**
         *
         * @override
         */
        init: function () {
            this._super.apply(this, arguments);
            this.modelNameFilter = 'tvs.project';
            this.domains = {};
        },
        /**
         * @override
         */
        onBuilt() {
            this._super.apply(this, arguments);
            // TODO Remove in master.
            this.$target[0].dataset['snippet'] = 's_projects';
        },

        //--------------------------------------------------------------------------
        // Private
        //--------------------------------------------------------------------------

        /**
         * Fetches blogs.
         * @private
         * @returns {Promise}
         */
        _fetchDomains: function () {
            return this._rpc({
                model: 'tvs.domain',
                method: 'search_read',
                kwargs: {
                    // domain: wUtils.websiteDomain(this),
                    domain: [
                        ['project_ids', '!=', false], // Add a filter to fetch domains where project_ids is not null
                    ],
                    fields: ['id', 'name'],
                }
            });
        },
        /**
         *
         * @override
         * @private
         */
        _renderCustomXML: async function (uiFragment) {
            await this._super.apply(this, arguments);
            await this._renderDomainSelector(uiFragment);
        },
        /**
         * Renders the blog option selector content into the provided uiFragment.
         * @private
         * @param {HTMLElement} uiFragment
         */
        _renderDomainSelector: async function (uiFragment) {
            if (!Object.keys(this.domains).length) {
                const domainsList = await this._fetchDomains();
                this.domains = {};
                for (let index in domainsList) {
                    this.domains[domainsList[index].id] = domainsList[index];
                }
            }
            const domainSelectorEl = uiFragment.querySelector('[data-name="domain_opt"]');
            return this._renderSelectUserValueWidgetButtons(domainSelectorEl, this.domains);
        },
        /**
         * Sets default options values.
         * @override
         * @private
         */
        _setOptionsDefaultValues: function () {
            this._setOptionValue('filterByDomainId', -1);
            this._super.apply(this, arguments);
        },
    });

    options.registry.dynamic_snippet_projects = dynamicSnippetProjectsOptions;

    return dynamicSnippetProjectsOptions;
});
