import requests


class LcaApiClient:
    def __init__(self, logger, base_url):
        self.logger = logger
        self.base_url = base_url
        self.headers = {
            "Content-Type": "application/json"
        }

    def get_countries(self):
        url = f"{self.base_url}/countries"
        response = requests.get(url)
        return response.json()

    def get_categories(self, type):
        url = f"{self.base_url}/categories?type={type}"
        response = requests.get(url)
        return response.json()

    def get_subcategories(self, category):
        url = f"{self.base_url}/sub-categories?category={category}"
        response = requests.get(url)
        return response.json()

    def get_materials(self, sub_category):
        url = f"{self.base_url}/products-by-sub-category?sub_category={sub_category}"
        response = requests.get(url)
        return response.json()

    def get_energies(self, category, type):
        url = f"{self.base_url}/products-by-category?category={category}&type={type}"
        response = requests.get(url)
        return response.json()

    def get_units(self):
        url = f"{self.base_url}/units"
        response = requests.get(url)
        return response.json()

    def product_mapping(self, data):
        url = f"{self.base_url}/product-mapping"
        response = requests.post(url, headers=self.headers, json=data)
        return response.json()

    def get_methods(self):
        url = f"{self.base_url}/lca-methods"
        response = requests.get(url)
        return response.json()

    def analyze_and_perform_assembly(self, data):
        url = f"{self.base_url}/perform-assembly"
        response = requests.post(url, headers=self.headers, json=data)
        return response.json()

    def analyze_with_new_method(self, data):
        url = f"{self.base_url}/perform-analyse"
        response = requests.post(url, headers=self.headers, json=data)
        return response.json()
