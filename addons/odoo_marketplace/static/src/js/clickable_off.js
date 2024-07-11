/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { Message } from '@mail/components/message/message';
import { PersonaImStatusIcon } from '@mail/components/persona_im_status_icon/persona_im_status_icon';
var ajax = require('web.ajax')
const { useState } = require('web.core');


patch(PersonaImStatusIcon.prototype, "off_personImStatusIcon",{
        _onClick: function (ev) {
        var self = this;
        const _super = this._super.bind(this);
        ajax.jsonRpc("/wk/check/mp/seller", "call", {})
          .then(function (is_seller) {
            if (!is_seller) {
              _super(ev);
            }
          });
      },
})

patch(Message.prototype, "clickable_off",{

  setup() {
  var res = this._super()
  var self = this
  ajax.jsonRpc("/wk/check/mp/seller", "call", {}).then(
    function (is_seller) {
      self.seller = is_seller
    }
  );
  return res
},
get messageView() {
        if (this.seller){
            var data =  this.props.record;
            data.onClickAuthorAvatar = function(){return false}
            data.onClickAuthorName = function(){return false}
            data.onClick = function(ev){ev.preventDefault(); return false}
            return data

        }
        return this._super()
    },
})
