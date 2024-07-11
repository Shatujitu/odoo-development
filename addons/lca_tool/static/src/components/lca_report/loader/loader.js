/** @odoo-module **/

import { Component, useState} from "@odoo/owl";
export class Loader extends Component {
 static template = "lca_tool.loader";
 start(){
    console.log("Loading Started!",this.state.loading)
 }
  setup() {
    this.state = useState({
        loading:false ,
    });
  }
}

