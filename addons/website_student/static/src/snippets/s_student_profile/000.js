odoo.define('website_student.s_student_profile_frontend', function (require) {
'use strict';

var publicWidget = require('web.public.widget');
const DynamicSnippet = require('website.s_dynamic_snippet');

const DynamicSnippetStudentProfile = DynamicSnippet.extend({
    selector: '.s_dynamic_snippet_student_profile',
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
        const filterByBlogId = parseInt(this.$el.get(0).dataset.filterByBlogId);
        if (filterByBlogId >= 0) {
            searchDomain.push(['college_id', '=', filterByBlogId]);
        }
        console.log(searchDomain)
        return searchDomain;
    },

});
publicWidget.registry.student_profile = DynamicSnippetStudentProfile;

return DynamicSnippetStudentProfile;
});
