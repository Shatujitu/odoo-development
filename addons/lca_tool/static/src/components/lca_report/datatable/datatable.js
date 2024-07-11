/** @odoo-module **/

import { Component,useState,onWillStart,onMounted,useRef, onWillUpdateProps } from "@odoo/owl";
import { loadJS,loadCSS } from "@web/core/assets";

export class Datatable extends Component {
 static template = "weldplanet.datatable";

 async loadDatatable(){
//     await loadJS('https://code.jquery.com/jquery-3.7.0.js');
     await loadCSS('https://cdn.datatables.net/1.13.7/css/jquery.dataTables.css');
     // await loadCSS('https://cdn.datatables.net/buttons/2.4.2/css/buttons.dataTables.min.css');
     await loadJS('https://cdn.datatables.net/1.13.7/js/jquery.dataTables.js');
     // await loadJS('https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js');
     // await loadJS('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js');
     // await loadJS('https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js');
     // await loadJS('https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js');
}


    getColumns(){
        let columns = [];
        for (let column of this.props.columns) {
          columns.push({"title":column.label, "data":column.field })
        }
        return columns;
      }

  renderTable(){
        setTimeout(()=>{
//            // Create an object with the prototype of Datatable
////            const dataTableInstance = Object.create(DataTable.prototype);
//
//            // Initialize the Datatable instance using the desired options
//            DataTable.call(this.dataTableInstance, this.tableRef.el, {
//                columns: this.getColumns(),
//                data: this.props.rows,
//                dom: 'Blfrtip',
//                buttons: [
//                    {
//                        extend: 'csvHtml5',
//                        text: '<i class="fa fa-file-text-o"></i>',
//                        titleAttr: 'CSV',
//                        className: 'table_button ms-4 ',
//                        title: this.props.title
//                    },
//                    {
//                        extend: 'print',
//                        text: '<i class="fa fa-print"></i>',
//                        titleAttr: 'Print',
//                        className: 'table_button ms-2',
//                        title: this.props.title
//                    },
//                ],
//            });
//
         if (this.dataTableInstance) {
            // Destroy the existing DataTable instance before reinitializing
            this.dataTableInstance.destroy();
          }

          // Create a new DataTable instance
          this.dataTableInstance = new DataTable(this.tableRef.el, {
            columns: this.getColumns(),
            data: this.props.rows,
            dom: 'Blfrtip',
            // buttons: [
            //   {
            //     extend: 'csvHtml5',
            //     text: '<i class="fa fa-file-text-o"></i>',
            //     titleAttr: 'CSV',
            //     className: 'table_button ms-4 ',
            //     title: this.props.title,
            //   },
            //   {
            //     extend: 'print',
            //     text: '<i class="fa fa-print"></i>',
            //     titleAttr: 'Print',
            //     className: 'table_button ms-2',
            //     title: this.props.title,
            //   },
            // ],
          });

      }, 100)

    }

  setup() {
      this.tableRef = useRef("datatable")
      this.dataTableInstance = null;

    onWillStart(async () => {
        await this.loadDatatable()
    });
    onMounted(async ()=> {
        await this.renderTable();
    })
    onWillUpdateProps(async ()=>{
        await this.renderTable();
    })

  }
}

