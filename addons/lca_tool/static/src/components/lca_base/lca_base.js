/** @odoo-module **/

import {Component, useState, onWillStart, onMounted, useRef} from "@odoo/owl";
import {LcaBasicData} from "../lca_basic_data/lca_basic_data";
import {LcaModelling} from "../lca_modelling/lca_modelling";
import {LcaReport} from "../lca_report/lca_report";

// import { loadJS, loadCSS } from "@web/core/assets";

export class LCA extends Component {
    static template = "lca_tool.lca_base";
    static components = {LcaBasicData, LcaModelling, LcaReport};

    setup() {
        onWillStart(async () => {
            this.units = await this._loadUnits();
            await this._loadMethodologyApi();
        });

        onMounted(async () => {
            await this.loadSelect2();
            await this._loadCountries();
        });

        this.state = useState({
            countries: [],
            methodologies: [],
            page: 0,
            messages: {
                basicDataStatus: "",
                modellingStatus: "",
                reportStatus: ""
            }
        })

        this.model = useState({
            lcaBasicData: {
                country_code: "",
                assemblyName: "",
                unit: "1 piece of structural unit",
                numberOfSubAssembly: 0,
            },
            lcaModelling: [],
            lcaReport: {
                method: "",
                reqBody: ""
            }
        })

        this.currentSubAssembly = useState({
            name: "",
            selectedBatchProcess: false,
            isMaterialCollapse: false,
            isEnergyCollapse: false,
            totalMass: 0,
            materials: [],
            energyConsumptions: []
        })

        this._basicDataValidation = this._basicDataValidation.bind(this);
        this._next = this._next.bind(this);
        this._cancelPage = this._cancelPage.bind(this);
        this.addMaterial = this.addMaterial.bind(this);
        this.editMaterial = this.editMaterial.bind(this);
        this.removeMaterial = this.removeMaterial.bind(this);
        this.addEnergyConsumption = this.addEnergyConsumption.bind(this);
        this.editEnergyConsumption = this.editEnergyConsumption.bind(this);
        this.removeEnergyConsumption = this.removeEnergyConsumption.bind(this);
        this.addSubAssembly = this.addSubAssembly.bind(this);
        this.clearSubAssembly = this.clearSubAssembly.bind(this);
    }

    async _loadMethodologyApi() {
        const apiUrl = '/api/lca-methods';
        let header = new Headers();
        header.append("Content-Type", "application/json");
        header.append("Accept", "application/json");

        try {
            let response = await fetch(apiUrl, {
                method: 'POST',
                headers: header,
                body: JSON.stringify({})
            });

            let data = await response.json();

            if (data?.result) {
                this.state.methodologies = data.result;
            }

        } catch (error) {
            console.log("Unit API error", error);
        }
    }


    onToggleMaterialCollapse = () => {
        this.currentSubAssembly.isMaterialCollapse = !this.currentSubAssembly.isMaterialCollapse;
    }

    onToggleEnergyCollapse = () => {
        this.currentSubAssembly.isEnergyCollapse = !this.currentSubAssembly.isEnergyCollapse;
    }

    async _loadCountries() {
        const apiUrl = '/api/countries';
        let header = new Headers();
        header.append("Content-Type", "application/json");
        header.append("Accept", "application/json");

        try {
            let response = await fetch(apiUrl, {
                method: 'POST',
                headers: header,
                body: JSON.stringify({})
            });

            let data = await response.json();

            if (data?.result) {
                this.state.countries = data.result
            }

        } catch (error) {
            console.log("Country API error", error);
        }
    }

    async _loadUnits() {
        const response = await fetch("/lca_tool/static/src/assets/json/units.json");
        return await response.json();
    }

    loadSelect2 = () => {
        const self = this;
        $(document).ready(function () {
            $('#countrySelect').select2({
                placeholder: "Select Country"
            });
            $('#countrySelect').on('change', function () {
                self.model.lcaBasicData.country_code = $(this).val();
            });
        });
    }

    async _next() {
        if (this.state.page === 0 && this._basicDataValidation()) {
            this.state.page = this.state.page + 1;
        } else if (this.state.page === 1) {
            this.model.lcaReport.reqBody = this.handleRequestBody();
            this.state.page = this.state.page + 1;
        }
        this.state.page = Math.min(3, this.state.page);
    }

    _cancelPage() {
        this.state.page = 0;
        this.model.lcaBasicData.country_code = "";
        this.model.lcaBasicData.assemblyName = "";
        this.model.lcaBasicData.unit = "";
        this.model.lcaBasicData.numberOfSubAssembly = 0;
        this.model.lcaModelling = [];
        this.model.lcaReport = {};
        this.clearSubAssembly();
    }

    _setMessage(status, message) {
        this.state.messages[status] = message !== "" ? message : "";

        setTimeout(() => {
            this.state.messages[status] = "";
        }, 5000);
    }

    _basicDataValidation() {
        if (this.model.lcaBasicData.country_code === "") {
            this._setMessage('basicDataStatus', 'country_error');
            return false;
        } else if (this.model.lcaBasicData.assemblyName === "") {
            this._setMessage('basicDataStatus', 'assemblyName_error');
            return false;
        } else if (this.model.lcaBasicData.unit === "") {
            this._setMessage('basicDataStatus', 'unit_error');
            return false;
        } else if (this.model.lcaBasicData.numberOfSubAssembly < 0 || this.model.lcaBasicData.numberOfSubAssembly > 20 || this.model.lcaBasicData.numberOfSubAssembly === "") {
            this._setMessage('basicDataStatus', 'numberOfSubAssembly_error');
            return false;
        } else {
            return true;
        }
    }

    addMaterial(materialData) {
        this.currentSubAssembly.materials = [...this.currentSubAssembly.materials, materialData]
        console.log("currentSubAssembly after adding", this.currentSubAssembly)
        console.log("this is SubAssemblies", this.model.lcaModelling)
    }

    editMaterial(materialData) {
        let index = this.currentSubAssembly.materials.findIndex((el) => el.id === materialData.id);
        this.currentSubAssembly.materials.splice(index, 1, materialData);
        console.log("currentSubAssembly after updating", this.currentSubAssembly)
        console.log("this is SubAssemblies", this.model.lcaModelling)
    }

    removeMaterial(materialId) {
        this.currentSubAssembly.materials = this.currentSubAssembly.materials.filter((el) => el.id !== materialId);
        console.log("currentSubAssembly after removing", this.currentSubAssembly)
        console.log("this is SubAssemblies", this.model.lcaModelling)
    }

    addEnergyConsumption(energyData) {
        this.currentSubAssembly.energyConsumptions = [...this.currentSubAssembly.energyConsumptions, energyData]
        console.log("currentSubAssembly after adding energyConsumptions", this.currentSubAssembly)
        console.log("this is SubAssemblies", this.model.lcaModelling)
    }

    editEnergyConsumption(energyData) {
        let index = this.currentSubAssembly.energyConsumptions.findIndex((el) => el.id === energyData.id);
        this.currentSubAssembly.energyConsumptions.splice(index, 1, energyData);
        console.log("currentSubAssembly after updating energyConsumptions", this.currentSubAssembly)
        console.log("this is SubAssemblies", this.model.lcaModelling)
    }

    removeEnergyConsumption(energyId) {
        this.currentSubAssembly.energyConsumptions = this.currentSubAssembly.energyConsumptions.filter((el) => el.id !== energyId);
        console.log("currentSubAssembly after removing energyConsumptions", this.currentSubAssembly)
        console.log("this is SubAssemblies", this.model.lcaModelling)
    }

    addSubAssembly() {
        this.model.lcaModelling = [...this.model.lcaModelling, _.clone(this.currentSubAssembly)]
        console.log("this is SubAssemblies", this.model.lcaModelling)
    }

    clearSubAssembly() {
        this.currentSubAssembly.name = ""
        this.currentSubAssembly.selectedBatchProcess = false
        this.currentSubAssembly.isMaterialCollapse = false
        this.currentSubAssembly.isEnergyCollapse = false
        this.currentSubAssembly.totalMass = 0
        this.currentSubAssembly.materials = []
        this.currentSubAssembly.energyConsumptions = []
    }

    handleRequestBody = () => {
        const data = {
            total_mass: 0,
            component_name: this.model.lcaBasicData.assemblyName,
            method: this.model.lcaReport.method,
            country_code: this.model.lcaBasicData.country_code,
            material_consumption: [],
            energy_consumption: [],
            sub_assemblies: []
        }

        const currentSubAssembly = {
            total_mass: 0,
            material_consumption: [],
            energy_consumption: []
        }

        const currentMaterial = {
            product: "",
            product_name: "",
            amount: 0,
            unit: "",
            process_type: 0,
            project_name: "",
            road_distance: "",
            marine_distance: ""
        }

        const currentEnergy = {
            product: "",
            product_name: "",
            amount: 0,
            unit: "",
            process_type: 0,
            project_name: "",
            estimation_type: "",
            monthly_production: null,
            overhead_factor: 0,
        }

        this.model.lcaModelling.forEach((subAssembly) => {
            subAssembly.materials.forEach((material) => {
                currentMaterial.product = material.productData.product
                currentMaterial.process_type = material.productData.process_type
                currentMaterial.project_name = material.productData.project_name
                currentMaterial.product_name = material.productData.product_name
                currentMaterial.amount = parseFloat(material.amount)
                currentMaterial.unit = material.unit
                currentMaterial.road_distance = parseFloat(material.road)
                currentMaterial.marine_distance = parseFloat(material.marine)
                currentSubAssembly.material_consumption.push(_.clone(currentMaterial))
            })
            subAssembly.energyConsumptions.forEach((energy) => {
                currentEnergy.product = energy.productData.product
                currentEnergy.process_type = energy.productData.process_type
                currentEnergy.project_name = energy.productData.project_name
                currentEnergy.product_name = energy.productData.product_name
                currentEnergy.amount = parseFloat(energy.amount)
                currentEnergy.unit = energy.unit
                currentEnergy.estimation_type = energy.estimationType
                currentEnergy.monthly_production = parseFloat(energy.monthlyProduction)
                currentEnergy.overhead_factor = parseFloat(energy.overheadFactor)
                currentSubAssembly.energy_consumption.push(_.clone(currentEnergy))
            })

            if (subAssembly.name === "finalAssembly") {
                data.total_mass = parseFloat(subAssembly.totalMass)
                data.material_consumption = currentSubAssembly.material_consumption
                data.energy_consumption = currentSubAssembly.energy_consumption
            } else {
                currentSubAssembly.total_mass = parseFloat(subAssembly.totalMass)
                data.sub_assemblies.push(_.clone(currentSubAssembly));
            }
            currentSubAssembly.total_mass = 0
            currentSubAssembly.material_consumption = []
            currentSubAssembly.energy_consumption = []
        })

        console.log("handleRequestBody", data);
        return data;
    }
}
