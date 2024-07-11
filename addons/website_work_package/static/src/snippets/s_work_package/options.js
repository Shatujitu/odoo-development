/** @odoo-module **/

import options from 'web_editor.snippets.options';

options.registry.WorkPackage = options.Class.extend({
    start() {
      console.log("Hello From ZZZZZZZZZZZZZ")
    }
})

export default {
    WorkPackage: options.registry.WorkPackage,
};
