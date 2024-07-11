/** @odoo-module **/

import options from 'web_editor.snippets.options';

options.registry.CaseStudy = options.Class.extend({
    start() {
      console.log("Hello From ZZZZZZZZZZZZZ")
    }
})

export default {
    CaseStudy: options.registry.CaseStudy,
};
