/** @odoo-module */

import { Component } from '@odoo/owl';

export class LcaBasicData extends Component {
  static template = "lca_tool.lca_basic_data";
  static props = {
    model: { type: Object, optional: true },
    countries: { type: Array, optional: true },
    units: { type: Array, optional: true },
    _basicDataValidation: { type: Function, optional: true },
    _next: { type: Function, optional: true },
    _cancelPage: { type: Function, optional: true },
  };

}

//LcaBasicData.template = 'lca_tool.lca_basic_data'
