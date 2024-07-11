/** @odoo-module */

import {Component, onWillStart, useState, onMounted} from '@odoo/owl';
import {Datatable} from "./datatable/datatable";
import {Loader} from "./loader/loader";

export class LcaReport extends Component {
    static template = "lca_tool.lca_report";
    static components = {Datatable, Loader};

    static props = {
        state: {type: Object, optional: true},
        reqBody: {type: Object, optional: true}
    }

    loadSelect2 = () => {
        let placeholder = this.props.reqBody.method ? this.props.reqBody.method : "Select Methodology";
        const self = this;
        $(document).ready(function () {
            $('#methodologySelect2').select2({
                placeholder: placeholder
            });
            self.state.method = self.props.reqBody.method;
            console.log(self.state.method)
            $('#methodologySelect2').on('change', function () {
                self.state.method = $(this).val();
                self.analyzeLcaWithMethod()
            });

        });
    }

    analyzeLcaWithMethod = () => {
        this.state.loading = true;
        setTimeout(async () => {
            await fetch(`/api/perform-analyse`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "product_name": this.state.lca_result.lci_data.product_name,
                    "method": this.state.method
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    this.state.lca_result.analyzed_response = res;

                    this.state.loading = false;
                    // console.log(res)
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error);
                    this.state.loading = false;
                });
        }, 1000)
    }

    _loadLcaResult = async () => {
        this.state.loading = true;
        setTimeout(async () => {
            await fetch(`/api/perform-assembly`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.props.reqBody),
            })
                .then((res) => res.json())
                .then((res) => {
                    this.state.lca_result = res;

                    this.state.loading = false;
                    // console.log(res)
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error);
                    this.state.loading = false;
                });
        }, 1000)
    }

    parseFloat2D = (value) => {
      return parseFloat(value).toFixed(2)
    }

    async _loadSampleLcaResult() {
        let response = await fetch("/lca_tool/static/src/assets/json/sample_lca_result.json");
        response = await response.json();
        this.state.lca_result = response
        // console.log(response)
    }

    lcaDataFormation = (data) => {
        let formattedData = [];
        let count = 1;
        data.forEach(item => {
            formattedData.push([count++, item.indicator_name, item.amount, item.unit_name]);
        });
        return formattedData;
    }

    lciDataFormation = (data) => {
        let formattedData = [];
        let count = 1;
        data.forEach(item => {
            let roundedAmount = parseFloat(item.amount).toFixed(2);
            formattedData.push([count++, item.product_name, roundedAmount, item.unit]);
        });
        return formattedData;
    }
    subAssemblyDataFormation = (subAssembly) => {
        let energyConsumption = [];
        let materialConsumption = [];
        let transportConsumption = [];
        let count = 1;
        subAssembly.material_consumption.forEach(material => {
            let roundedAmount = parseFloat(material.amount).toFixed(2);
            materialConsumption.push([count++, material.product_name, roundedAmount, material.unit]);
        });
        count = 1;
        subAssembly.energy_consumption.forEach(energy => {
            let roundedAmount = parseFloat(energy.amount).toFixed(2);
            energyConsumption.push([count++, energy.product_name, roundedAmount, energy.unit]);
        });
        count = 1;
        subAssembly.transportations.forEach(transport => {
            let roundedAmount = parseFloat(transport.amount).toFixed(2);
            transportConsumption.push([count++, transport.product_name, roundedAmount, transport.unit]);
        });
        count = 1;
        return [materialConsumption, energyConsumption, transportConsumption];
    }

    saveAsPDF = (print=false) => {
        // Initialize jsPDF and autoTable
        const jsPDF = window.jspdf.jsPDF;
        const autoTable = window.jspdfAutoTable;

        // Create a new jsPDF instance
        const doc = new jsPDF({format: "a4",});

        // Define padding and margin for page body
        let posY = 10; // Tracking the Y-axis

        const pageWidth = doc.internal.pageSize.width;
        const marginLeft = 10;
        const marginRight = 10;
        const leftPadding = 5;
        const maxWidth = pageWidth - marginLeft - marginRight;
        const gapTopTable = 3;
        const gapUnderTable = 7;
        const gapUnderText = 5;
        const gapUnderSection = 10;


        doc.setTextColor("#448C5C");
        let headerText = "Life-Cycle Assessment Report";
        let spaceHeader = marginLeft + (pageWidth - (doc.getStringUnitWidth(headerText) * doc.internal.getFontSize() / 2)) / 2;

        doc.text(headerText, spaceHeader, posY);
        posY += 3

        // doc.line(startX, startY, endX , endY);
        doc.line(marginLeft, posY, pageWidth - marginRight, posY);
        posY += 5
        doc.setTextColor("#000");
        doc.setFontSize(12);
        doc.text('User input for material and energy ', marginLeft, posY);
        posY += 5

        doc.setFontSize(10);

        // Table header
        const lciTableMaterialHeader = [['#', 'Material Name', 'Amount', 'Unit']]
        const lciTableEnergyHeader = [['#', 'Electrical Energy', 'Amount', 'Unit']]
        const lciTableTransportHeader = [['#', 'Transportation Mode', 'Amount', 'Unit']]
        const lcaTableHeader = [['#', 'Indicator Name', 'Amount', 'Unit']]

        // Assembly Table Start
        let assemblyTitle = this.state.lca_result.lci_data.assembly_name;
        let assemblyEnergyConsumption = this.lciDataFormation(this.state.lca_result.lci_data.energy_consumption)
        let assemblyMaterialConsumption = this.lciDataFormation(this.state.lca_result.lci_data.material_consumption)
        let assemblyTransportConsumption = this.lciDataFormation(this.state.lca_result.lci_data.transportations)

        doc.text("Assembly: " + assemblyTitle, marginLeft, posY)
        posY += gapUnderText
        doc.text("Table: Material Consumption", marginLeft + leftPadding, posY)
        posY += gapTopTable
        doc.autoTable({
            startY: posY,
            head: lciTableMaterialHeader, // Header row
            body: assemblyMaterialConsumption // Body rows
        });
        posY = (doc.lastAutoTable.finalY) + gapUnderTable;

        if (assemblyEnergyConsumption.length > 0) {
            doc.text("Table: Energy Consumption", marginLeft + leftPadding, posY)
            posY += gapTopTable
            doc.autoTable({
                startY: posY,
                head: lciTableEnergyHeader, // Header row
                body: assemblyEnergyConsumption // Body rows
            });
        }
        posY = (doc.lastAutoTable.finalY) + gapUnderTable;

        if (assemblyTransportConsumption.length > 0) {
            doc.text("Table: Transportations", marginLeft + leftPadding, posY)
            posY += gapTopTable
            doc.autoTable({
                startY: posY,
                head: lciTableTransportHeader, // Header row
                body: assemblyTransportConsumption // Body rows
            });
        }
        posY = (doc.lastAutoTable.finalY) + gapUnderSection;
        // Assembly Table End

        // Sub-Assembly Start
        this.state.lca_result.lci_data.sub_assemblies.forEach(subAssembly => {
            let subAssemblyData = this.subAssemblyDataFormation(subAssembly)
            // Generate the table in the PDF document
            doc.text("Sub-Assembly: " + subAssembly.sub_assembly_name, marginLeft, posY)
            posY += gapUnderText
            doc.text("Table: Material Consumption", marginLeft + leftPadding, posY)
            posY += gapTopTable
            doc.autoTable({
                startY: posY,
                head: lciTableMaterialHeader, // Header row
                body: subAssemblyData[0] // Body rows
            });
            posY = (doc.lastAutoTable.finalY) + gapUnderTable;

            if (subAssemblyData[1].length > 0) {
                doc.text("Table: Energy Consumption", marginLeft + leftPadding, posY)
                posY += gapTopTable
                doc.autoTable({
                    startY: posY,
                    head: lciTableEnergyHeader, // Header row
                    body: subAssemblyData[1] // Body rows
                });
            }
            posY = (doc.lastAutoTable.finalY) + gapUnderTable;

            if (subAssemblyData[2].length > 0) {
                doc.text("Table: Transportation", marginLeft + leftPadding, posY)
                posY += gapTopTable
                doc.autoTable({
                    startY: posY,
                    head: lciTableTransportHeader, // Header row
                    body: subAssemblyData[2] // Body rows
                });
            }
            posY = (doc.lastAutoTable.finalY) + gapUnderSection;
        });
        // Sub-Assembly Table End

        /// LCA
        posY += 15
        doc.setFontSize(12);
        doc.text('Life-Cycle Assessment (LCA) Result', marginLeft, posY);
        posY += 5
        doc.setFontSize(10);

        // Assembly Table Start
        let lcaCharacterisation = this.lcaDataFormation(this.state.lca_result.analyzed_response.rtCharacterisation)
        let lcaDamage = this.lcaDataFormation(this.state.lca_result.analyzed_response.rtDamage)
        let lcaSingleScore = this.lcaDataFormation(this.state.lca_result.analyzed_response.rtSingleScore)

        if (lcaCharacterisation.length > 0) {
            doc.text("Table: Characterisation", marginLeft + leftPadding, posY)
            posY += gapTopTable
            doc.autoTable({
                startY: posY,
                headStyles: {fillColor: [68, 140, 92]},
                head: lcaTableHeader, // Header row
                body: lcaCharacterisation // Body rows
            });
        }
        posY = (doc.lastAutoTable.finalY) + gapUnderSection;

        if (lcaDamage.length > 0) {
            doc.text("Table: Damage Assessment", marginLeft + leftPadding, posY)
            posY += gapTopTable
            doc.autoTable({
                startY: posY,
                headStyles: {fillColor: [68, 140, 92]},
                head: lcaTableHeader, // Header row
                body: lcaDamage // Body rows
            });
        }
        posY = (doc.lastAutoTable.finalY) + gapUnderSection;

        if (lcaSingleScore.length > 0) {
            doc.text("Table: Single Score", marginLeft + leftPadding, posY)
            posY += gapTopTable
            doc.autoTable({
                startY: posY,
                headStyles: {fillColor: [68, 140, 92]},
                head: lcaTableHeader, // Header row
                body: lcaSingleScore // Body rows
            });
        }
        posY = (doc.lastAutoTable.finalY) + gapUnderSection;
        // LCA End


        // Save or print the PDF
        if (print==true) {
            doc.autoPrint();
            doc.save(`lca-report-${this.state.lca_result.lci_data.assembly_name.slice(0, -3)}.pdf`);
        }
        else
            doc.save(`lca-report-${this.state.lca_result.lci_data.assembly_name.slice(0, -3)}.pdf`);

    }

    setup() {
        this.state = useState({
            lca_result: null,
            loading: false,
            method: "",
            lca_columns: [
                {label: "Indicator name", field: "indicator_name"},
                {label: "Amount", field: "amount"},
                {label: "Unit name", field: "unit_name"},
            ],

        })

        onWillStart(async () => {
            // await this._loadSampleLcaResult();
            await this._loadLcaResult();

        });

        onMounted(async () => {
            await this.loadSelect2();
        });
    }
}
