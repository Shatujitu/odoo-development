/** @odoo-module */

import {Component, useState, onMounted, onWillStart} from '@odoo/owl';

export class LcaModelling extends Component {
  static template = "lca_tool.lca_modelling";
  static props = {
    state: {type: Object, optional: true},
    model: {type: Object, optional: true},
    _next: {type: Function, optional: true},
    _cancelPage: {type: Function, optional: true},
    onToggleMaterialCollapse: {type: Function, optional: true},
    onToggleEnergyCollapse: {type: Function, optional: true},
    addMaterial: {type: Function, optional: true},
    editMaterial: {type: Function, optional: true},
    removeMaterial: {type: Function, optional: true},
    addEnergyConsumption: {type: Function, optional: true},
    editEnergyConsumption: {type: Function, optional: true},
    removeEnergyConsumption: {type: Function, optional: true},
    addSubAssembly: {type: Function, optional: true},
    clearSubAssembly: {type: Function, optional: true},
    currentSubAssembly: {type: Object, optional: true},
  };

  setup() {
    onWillStart(async () => {
      await this._loadUnits();
    });

    onMounted(async () => {
      this.owl2();
      await this.loadSelect2();
      await this.loadSelect();
      await this._loadMaterialApi();
      // await this._loadEnergyApi();
    });

    this.state = useState({
      materialCategories: [],
      materialSubCategories: [],
      materialProducts: [],
      energyCategories: ["Electricity, low voltage", "Electricity, medium voltage"],
      energyProducts: [],
      // methodologies: [],
      units: {},
      productData: {},
      numberOfSubAssembly: [...Array(1 * this.props.model.lcaBasicData.numberOfSubAssembly + 1).keys()],
      finalAssemblyIndex: 1 * this.props.model.lcaBasicData.numberOfSubAssembly,
      stepOfSubAssembly: 0,
      materialModalDisplay: "none",
      energyModalDisplay: "none",
      methodologyModalDisplay: "none",
      currentModalType: "",
      showInputField: false,
      showSubCategorySelection: false,
      showProductSelection: false,
      showSearchList: false,
      backgroundColor: "",
    });

    this.currentMaterial = useState({
      id: "",
      level: 1,
      type: "material",
      category: "",
      subCategory: "",
      name: "",
      amount: 0,
      unit: "",
      road: 0,
      marine: 0,
      productData: {}
    });

    this.currentEnergyConsumption = useState({
      id: "",
      level: 1,
      type: "energy",
      category: "",
      name: "",
      amount: 0,
      initialReading: 0,
      finalReading: 0,
      unit: "",
      productData: {},
      estimationType: "",
      knowEnergyAmount: false,
      monthlyProduction: 0,
      overheadFactor: 0,
    });

    this.handleOpenMaterialModal = this.handleOpenMaterialModal.bind(this);
    this.handleCloseMaterialModal = this.handleCloseMaterialModal.bind(this);
    this.handleOpenEnergyModal = this.handleOpenEnergyModal.bind(this);
    this.handleCloseEnergyModal = this.handleCloseEnergyModal.bind(this);
    this.handleOpenMethodologyModal = this.handleOpenMethodologyModal.bind(this);
    this.handleCloseMethodologyModal = this.handleCloseMethodologyModal.bind(this);
    this.toggleInputField = this.toggleInputField.bind(this);
    // this.onToggleMaterialCollapse = this.onToggleMaterialCollapse.bind(this);
  }

  handleOpenMaterialModal(materialData) {
    if (materialData) {
      this.currentMaterial.type = materialData.type;
      this.currentMaterial.category = materialData.category;
      this.currentMaterial.subCategory = materialData.subCategory;
      this.currentMaterial.id = materialData.id;
      this.currentMaterial.name = materialData.name;
      this.currentMaterial.amount = materialData.amount;
      this.currentMaterial.unit = materialData.unit;
      this.currentMaterial.road = materialData.road;
      this.currentMaterial.marine = materialData.marine;
      this.currentMaterial.productData = materialData.productData;
    } else {
      this.clearMaterialForm();
    }
    this.state.productData = {};
    this.state.currentModalType = "material";
    this.state.materialModalDisplay = "block";
  }

  handleCloseMaterialModal() {
    this.state.materialModalDisplay = "none";
  }

  handleOpenEnergyModal(energyData) {
    if (energyData) {
      this.currentEnergyConsumption.level = energyData.level;
      this.currentEnergyConsumption.type = energyData.type;
      this.currentEnergyConsumption.category = energyData.category;
      this.currentEnergyConsumption.id = energyData.id;
      this.currentEnergyConsumption.name = energyData.name;
      this.currentEnergyConsumption.amount = energyData.amount;
      this.currentEnergyConsumption.unit = energyData.unit;
      this.currentEnergyConsumption.productData = energyData.productData;
      this.currentEnergyConsumption.monthlyProduction = energyData.monthlyProduction;
      this.currentEnergyConsumption.knowEnergyAmount = energyData.knowEnergyAmount;
      this.currentEnergyConsumption.initialReading = energyData.initialReading;
      this.currentEnergyConsumption.finalReading = energyData.finalReading;
      this.currentEnergyConsumption.estimationType = energyData.estimationType;
      this.currentEnergyConsumption.overheadFactor = energyData.overheadFactor;
    } else {
      this.clearEnergyConsumptionForm();
    }
    this.state.productData = {};
    this.state.currentModalType = "energy";
    this.state.energyModalDisplay = "block";
  }

  handleCloseEnergyModal() {
    this.state.energyModalDisplay = "none";
  }

  handleOpenMethodologyModal() {
    this.state.methodologyModalDisplay = "block"
  }

  handleCloseMethodologyModal() {
    this.state.methodologyModalDisplay = "none"
  }

  get materialModalView() {
    return `display: ${this.state.materialModalDisplay};`
  }

  get energyModalView() {
    return `display: ${this.state.energyModalDisplay};`
  }

  get errorOutline() {
    return `background-color: ${this.state.backgroundColor}`
  }

  get methodologyModalView() {
    return `display: ${this.state.methodologyModalDisplay};`
  }

  // Event handler to toggle input field visibility based on checkbox state
  toggleInputField(ev) {
    const isChecked = ev.target.checked;
    this.state.showInputField = isChecked;
  }

  clearMonthlyEnergy() {
    this.currentEnergyConsumption.amount = 0;
    this.currentEnergyConsumption.monthlyProduction = 0;
    this.currentEnergyConsumption.knowEnergyAmount = false;
    this.currentEnergyConsumption.initialReading = 0;
    this.currentEnergyConsumption.finalReading = 0;
    this.props.currentSubAssembly.totalMass = 0;
    this.currentEnergyConsumption.overheadFactor = 0;
  }

  clearProcessEnergy() {
    this.currentEnergyConsumption.amount = 0;
    this.props.currentSubAssembly.totalMass = 0;
    this.currentEnergyConsumption.overheadFactor = 20;

  }

  clearAmountReading() {
    this.currentEnergyConsumption.amount = 0;
    this.currentEnergyConsumption.initialReading = 0;
    this.currentEnergyConsumption.finalReading = 0;
  }

  amountCalculate(){
    this.currentEnergyConsumption.amount = this.currentEnergyConsumption.finalReading - this.currentEnergyConsumption.initialReading;
    console.log("this is amount calculation", this.currentEnergyConsumption.amount);
  }

  async _loadUnits() {
    const apiUrl = '/api/units';
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
        this.state.units = data.result
      }

    } catch (error) {
      console.log("Unit API error", error);
    }
  }

    async _loadProductMapping() {
        const apiUrl = '/api/product-mapping';
        let header = new Headers();
        header.append("Content-Type", "application/json");
        header.append("Accept", "application/json");

        let productName = this.state.currentModalType === "material" ? this.currentMaterial.name : this.state.currentModalType === "energy" ? this.currentEnergyConsumption.name : ""

        try {
          let response = await fetch(apiUrl, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
              country_code: this.props.model.lcaBasicData.country_code,
              product: productName,
              type: this.state.currentModalType
            })
          });

          let data = await response.json();
          console.log("Product Mapping API data", data.result);

          if (data?.result) {
            this.state.productData = data.result

            if (this.state.currentModalType === "material") {
              this.currentMaterial.road = this.state.productData.road_distance;
              this.currentMaterial.marine = this.state.productData.marine_distance;
              this.currentMaterial.unit = this.state.productData.default_unit;
            } else if (this.state.currentModalType === "energy") {
              this.currentEnergyConsumption.unit = this.state.productData.default_unit;
            }
          }

        } catch (error) {
          console.log("Product Mapping API error", error);
        }
    }

  onSubAssemblyStepChange(step) {
    if (step > this.state.finalAssemblyIndex) {
      this.saveCurrentSubAssembly();
      this.loadTargetSubAssembly(this.state.finalAssemblyIndex);
      if (this.lcaModellingValidation()) {
        this.handleOpenMethodologyModal();
      }
    } else if (step == this.state.stepOfSubAssembly) {
      return;
    } else {
      if (this.subAssemblyValidation()) {
      // save current step's data
        this.saveCurrentSubAssembly();
      // jump to desired step
        this.loadTargetSubAssembly(step);
      // update step
        this.state.stepOfSubAssembly = step;
      }
    }
    this.state.stepOfSubAssembly = Math.min(this.state.numberOfSubAssembly.length, this.state.stepOfSubAssembly);
    console.log("onSubAssemblyStepChange", this.props.model.lcaModelling);
  }

  saveCurrentSubAssembly() {
    let currentSubAssemblyName = this.state.stepOfSubAssembly == this.state.finalAssemblyIndex ? 'finalAssembly' : `subAssembly${this.state.stepOfSubAssembly}`;
    let subAssemblyIsExist = this.props.model.lcaModelling.findIndex(el => el.name === currentSubAssemblyName);
    if (subAssemblyIsExist > -1) {
      let subAssemblyData = this.props.model.lcaModelling[subAssemblyIsExist];
      subAssemblyData.name = this.props.currentSubAssembly.name;
      subAssemblyData.selectedBatchProcess = this.props.currentSubAssembly.selectedBatchProcess;
      subAssemblyData.isMaterialCollapse = this.props.currentSubAssembly.isMaterialCollapse;
      subAssemblyData.isEnergyCollapse = this.props.currentSubAssembly.isEnergyCollapse;
      subAssemblyData.totalMass = this.props.currentSubAssembly.totalMass;
      subAssemblyData.materials = this.props.currentSubAssembly.materials;
      subAssemblyData.energyConsumptions = this.props.currentSubAssembly.energyConsumptions;
    } else {
      this.props.currentSubAssembly.name = currentSubAssemblyName;
      this.props.addSubAssembly();
      this.props.clearSubAssembly();
    }
  }

  loadTargetSubAssembly(step) {
    let nextSubAssemblyName = step == this.state.finalAssemblyIndex ? 'finalAssembly' : `subAssembly${step}`;
    let nextSubAssemblyIsExist = this.props.model.lcaModelling .findIndex(el => el.name === nextSubAssemblyName);
    if (nextSubAssemblyIsExist > -1) {
      let subAssemblyData = this.props.model.lcaModelling[nextSubAssemblyIsExist]
      this.props.currentSubAssembly.name = subAssemblyData.name
      this.props.currentSubAssembly.selectedBatchProcess = subAssemblyData.selectedBatchProcess
      this.props.currentSubAssembly.isMaterialCollapse = subAssemblyData.isMaterialCollapse
      this.props.currentSubAssembly.isEnergyCollapse = subAssemblyData.isEnergyCollapse
      this.props.currentSubAssembly.totalMass = subAssemblyData.totalMass
      this.props.currentSubAssembly.materials = subAssemblyData.materials
      this.props.currentSubAssembly.energyConsumptions = subAssemblyData.energyConsumptions
    } else {
      this.props.clearSubAssembly();
    }
  }

  subAssemblyValidation() {
    if (this.props.currentSubAssembly.materials.length <= 0) {
      if (this.props.model.lcaModelling.length > 0 && this.state.stepOfSubAssembly == this.state.finalAssemblyIndex) {
        return true;
      }
      return false;
    }
    return true;
  }

  lcaModellingValidation() {
    let numberOfSubAssembly = 1 * this.props.model.lcaBasicData.numberOfSubAssembly + 1;
    if (this.props.model.lcaModelling.length < numberOfSubAssembly) {
      this.state.backgroundColor = "#ff6464"
      return false;
    }
    return true;
  }

  materialValidation() {
    if (this.currentMaterial.category === "" || this.currentMaterial.subCategory === "" || this.currentMaterial.name === "") {
      return false;
    } else if (this.currentMaterial.amount <= 0 || this.currentMaterial.amount === "") {
      return false;
    } else if (this.currentMaterial.unit === "") {
      return false;
    } else if (this.currentMaterial.road <= 0 || this.currentMaterial.road === "") {
      return false;
    } else if (this.currentMaterial.marine <= 0 || this.currentMaterial.marine === "") {
      return false;
    }
    return true;
  }

  energyValidation() {
    if (this.currentEnergyConsumption.name === "") {
      return false;
    } else if (this.currentEnergyConsumption.amount <= 0 || this.currentEnergyConsumption.amount === "") {
      return false;
    } else if (this.currentEnergyConsumption.unit === "") {
      return false;
    } else if (this.props.currentSubAssembly.totalMass <= 0 || this.props.currentSubAssembly.totalMass === "") {
      return false;
    }

    if (this.currentEnergyConsumption.estimationType === 'monthly') {
      if (this.currentEnergyConsumption.monthlyProduction <= 0 || this.currentEnergyConsumption.monthlyProduction === "") {
      return false;
      }
      if (this.currentEnergyConsumption.overheadFactor <= 0 || this.currentEnergyConsumption.overheadFactor > 100 || this.currentEnergyConsumption.overheadFactor === "") {
      return false;
      }
    }

    if (this.currentEnergyConsumption.knowEnergyAmount) {
      if (this.currentEnergyConsumption.initialReading <= 0 || this.currentEnergyConsumption.initialReading === "" || this.currentEnergyConsumption.finalReading <= 0 || this.currentEnergyConsumption.finalReading === "") {
        return false;
      }
    }
    return true;
  }

  handleAddMaterial() {
    this.currentMaterial.id = this.generateId();
    this.currentMaterial.productData = _.clone(this.state.productData);
    this.props.addMaterial(_.clone(this.currentMaterial));
    this.clearMaterialForm();
    this.handleCloseMaterialModal();
  }

  handleEditMaterial() {
    this.currentMaterial.productData = _.clone(this.state.productData);
    this.props.editMaterial(_.clone(this.currentMaterial));
    this.clearMaterialForm();
    this.handleCloseMaterialModal();
  }

  handleRemoveMaterial(materialId) {
    this.props.removeMaterial(materialId);
  }

  generateId() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 7) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  clearMaterialForm() {
    this.currentMaterial.id = "";
    this.currentMaterial.level = 1;
    this.currentMaterial.category = "";
    this.currentMaterial.subCategory = "";
    this.currentMaterial.name = "";
    this.currentMaterial.amount = 0;
    this.currentMaterial.unit = "";
    this.currentMaterial.road = 0;
    this.currentMaterial.marine = 0;
    this.state.showSubCategorySelection = false;
    this.state.showProductSelection = false;
    this.currentMaterial.productData = {};
  }

  handleAddEnergyConsumption() {
    this.currentEnergyConsumption.id = this.generateId();
    this.currentEnergyConsumption.productData = _.clone(this.state.productData);
    this.props.addEnergyConsumption(_.clone(this.currentEnergyConsumption));
    this.clearEnergyConsumptionForm();
    this.handleCloseEnergyModal();
  }

  handleEditEnergyConsumption() {
    this.currentEnergyConsumption.productData = _.clone(this.state.productData);
    this.props.editEnergyConsumption(_.clone(this.currentEnergyConsumption));
    this.clearEnergyConsumptionForm();
    this.handleCloseEnergyModal();
  }

  handleRemoveEnergyConsumption(energyId) {
    this.props.removeEnergyConsumption(energyId);
  }

  clearEnergyConsumptionForm() {
    this.currentEnergyConsumption.id = "";
    this.currentEnergyConsumption.level = 1;
    this.currentEnergyConsumption.category = "";
    this.currentEnergyConsumption.name = "";
    this.currentEnergyConsumption.amount = 0;
    this.currentEnergyConsumption.unit = "";
    this.currentEnergyConsumption.productData = {};
    this.currentEnergyConsumption.monthlyProduction = 0;
    this.currentEnergyConsumption.knowEnergyAmount = false;
    this.currentEnergyConsumption.initialReading = 0;
    this.currentEnergyConsumption.finalReading = 0;
    this.currentEnergyConsumption.estimationType = "";
    this.currentEnergyConsumption.overheadFactor = 0;
  }

  _loadMaterialApi = async () => {
    if (this.currentMaterial.level === 1) {
      fetch(`/api/categories?type=${this.currentMaterial.type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.state.materialCategories = data;
        })
        .catch((error) => {
          console.log("error")
        });
    }
    if (this.currentMaterial.level === 2) {
      fetch(`/api/sub-categories?category=${this.currentMaterial.category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.state.materialSubCategories= data;
        })
        .catch((error) => {
          console.log("error")
        });
    }
    if (this.currentMaterial.level === 3) {
      fetch(`/api/products-by-sub-category?sub_category=${this.currentMaterial.subCategory}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.state.materialProducts = data;
        })
        .catch((error) => {
          console.log("error")
        });
    }
  }

  _loadEnergyApi = async () => {
    if (this.currentEnergyConsumption.level === 1) {
      fetch(`/api/categories?type=${this.currentEnergyConsumption.type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.state.energyCategories = data;
        })
        .catch((error) => {
          console.log("error")
        });
    }
    if (this.currentEnergyConsumption.level === 2) {
      fetch(`/api/products-by-category?category=${this.currentEnergyConsumption.category}&type=${this.currentEnergyConsumption.type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.state.energyProducts = data;
        })
        .catch((error) => {
          console.log("error")
        });
    }
  }

  loadSelect2 = () => {
    const self = this;
    $(document).ready(function () {
      $('#methodologySelect').select2({
        placeholder: "Select Methodology"
      });
      $('#methodologySelect').on('change', function () {
        self.props.model.lcaReport.method = $(this).val();
      });

    });
  }

  loadSelect = () => {
    const self = this;
    $(document).ready(function () {
      $('#materialCategorySelect').on('change', function () {
        self.currentMaterial.category = $(this).val();
        self.currentMaterial.level = 2;
        self.currentMaterial.name = "";
        self.currentMaterial.subCategory = "";
        self.state.showSearchList = false;
        self.state.showSubCategorySelection = true;
        self._loadMaterialApi();
      });
      $('#materialSubCategorySelect').on('change', function () {
        self.currentMaterial.subCategory = $(this).val();
        self.currentMaterial.level = 3;
        self.currentMaterial.name = "";
        self.state.showSearchList = false;
        self.state.showProductSelection = true;
        self._loadMaterialApi();
      });
      $('#energyCategorySelect').on('change', function () {
        self.currentEnergyConsumption.name = $(this).val();
        self._loadProductMapping();
      });
      $("#searchInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".dropdown-menu li").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
      $("#searchInput").on("change", function () {
        self.currentMaterial.name = "";
        $('#searchInput').val("");
      });
    });
  }

  onItemSelect = (value) => {
    this.currentMaterial.name = value;
    this._loadProductMapping();
    $('#searchInput').val(value);
    this.state.showSearchList = false;
  }
  showSearchList = () => {
    this.state.showSearchList = true;
  }

  owl2 = () => {
    $('.owl-carousel').owlCarousel({
      items: 6,
      loop: false,
      margin: 10,
      nav: true,
      center: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    })
  }
}
