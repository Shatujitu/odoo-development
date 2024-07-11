/** @odoo-module **/

import options from 'web_editor.snippets.options';

options.registry.ConsortiumPartner = options.Class.extend({
    start() {
      console.log("Hello From ZZZZZZZZZZZZZ")
    }
})

export default {
    ConsortiumPartner: options.registry.ConsortiumPartner,
};
