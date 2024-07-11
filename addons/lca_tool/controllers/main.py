from odoo import http
from odoo.http import request, Response
from ..services.main import LcaApiClient
import json
import requests
import logging

_logger = logging.getLogger(__name__)

class LCA(http.Controller):
    @http.route('/lca-tool', website=True, auth='public', methods=['GET'])
    def get_lca_tool(self, **kwargs):
        # default_value = {}
        return request.render('lca_tool.get_lca', {"filled_data": json.dumps(kwargs)})

    # Extra internal new method
    def _get_api_config_external(self):
        config = request.env['ir.config_parameter'].sudo()
        _base_url = config.get_param('lca_api.base_url')
        _logger.info('Config lca_api.base_url: <%s>', _base_url)
        return _base_url

    def _get_client_external(self):
        _base_url = self._get_api_config_external()
        _lca_api_client = LcaApiClient(logger=_logger, base_url=_base_url)
        return _lca_api_client

    @http.route(['/api/countries'], type='json', auth='public', methods=['POST'])
    def api_countries(self, **kw):
        _lca_api_client = self._get_client_external()
        _response = {}
        try:
            _response = _lca_api_client.get_countries()
            _logger.info('********** /api/countries **********')
            _logger.info(_response)
            if 'error' in _response:
                _logger.error('LCA API: read countries error: <%s>', _response['error'])
            else:
                _logger.info('LCA API: read countries response: <%s>', _response)
        except Exception as e:
            _logger.error("LCA API: read countries error: <%s>", e)
        return _response

    @http.route(['/api/categories'], website=True, auth='public', methods=['GET'])
    def api_categories(self, **kw):
        if 'type' not in kw:
            return Response(json.dumps({"error": "type key is required!"}))
        _lca_api_client = self._get_client_external()
        _response = {}
        try:
            _response = _lca_api_client.get_categories(kw['type'])
            _logger.info('********** /api/categories **********')
            _logger.info(_response)
            if 'error' in _response:
                _logger.error('LCA API: read categories error: <%s>', _response['error'])
            else:
                _logger.info('LCA API: read categories response: <%s>', _response)
        except Exception as e:
            _logger.error("LCA API: read categories error: <%s>", e)
        return Response(json.dumps(_response))

    @http.route(['/api/sub-categories'], website=True, auth='public', methods=['GET'])
    def api_subcategories(self, **kw):
        if 'category' not in kw:
            return Response(json.dumps({"error": "category key is required!"}))
        _lca_api_client = self._get_client_external()
        _response = {}
        try:
            _response = _lca_api_client.get_subcategories(kw['category'])
            _logger.info('********** /api/sub-categories **********')
            _logger.info(_response)
            if 'error' in _response:
                _logger.error('LCA API: read sub categories error: <%s>', _response['error'])
            else:
                _logger.info('LCA API: read sub categories response: <%s>', _response)
        except Exception as e:
            _logger.error("LCA API: read sub categories error: <%s>", e)
        return Response(json.dumps(_response))

    @http.route(['/api/products-by-sub-category'], website=True, auth='public', methods=['GET'])
    def api_products_by_subcategories(self, **kw):
        if 'sub_category' not in kw:
            return Response(json.dumps({"error": "sub_category key is required!"}))
        _lca_api_client = self._get_client_external()
        _response = {}
        try:
            _response = _lca_api_client.get_materials(kw['sub_category'])
            _logger.info('********** /api/products-by-sub-category **********')
            _logger.info(_response)
            if 'error' in _response:
                _logger.error('LCA API: read materials error: <%s>', _response['error'])
            else:
                _logger.info('LCA API: read materials response: <%s>', _response)
        except Exception as e:
            _logger.error("LCA API: read materials error: <%s>", e)
        return Response(json.dumps(_response))

    @http.route(['/api/products-by-category'], website=True, auth='public', methods=['GET'])
    def api_products_by_categories(self, **kw):
        if 'category' not in kw or 'type' not in kw:
            return Response(json.dumps({"error": "category and type key is required!"}))
        _lca_api_client = self._get_client_external()
        _response = {}
        try:
            _response = _lca_api_client.get_energies(kw['category'], kw['type'])
            _logger.info('********** /api/products-by-category **********')
            _logger.info(_response)
            if 'error' in _response:
                _logger.error('LCA API: read materials error: <%s>', _response['error'])
            else:
                _logger.info('LCA API: read materials response: <%s>', _response)
        except Exception as e:
            _logger.error("LCA API: read materials error: <%s>", e)
        return Response(json.dumps(_response))

    @http.route(['/api/units'], type='json', auth='public', methods=['POST'])
    def api_units(self, **kw):
        _lca_api_client = self._get_client_external()
        _response = {}
        try:
            _response = _lca_api_client.get_units()
            _logger.info('********** /api/units **********')
            _logger.info(_response)
            if 'error' in _response:
                _logger.error('LCA API: read units error: <%s>', _response['error'])
            else:
                _logger.info('LCA API: read units response: <%s>', _response)
        except Exception as e:
            _logger.error("LCA API: read units error: <%s>", e)
        return _response

    @http.route(['/api/product-mapping'], type='json', auth='public', methods=['POST'])
    def api_product_mapping(self, **kw):
        payload = json.loads(request.httprequest.data)
        _lca_api_client = self._get_client_external()

        _response = {}
        try:
            _response = _lca_api_client.product_mapping(payload)
            _logger.info('********** /api/product-mapping **********')
            _logger.info(_response)
            if 'error' in _response:
                _logger.error('LCA API: read product_mapping error: <%s>', _response['error'])
        except Exception as e:
            _logger.error("LCA API: read product_mapping error: <%s>", e)
            # Logs the error appropriately.
        return _response

    @http.route(['/api/lca-methods'], type='json', auth='public', methods=['POST'])
    def api_methods(self, **kw):
        _lca_api_client = self._get_client_external()
        _response = {}
        try:
            _response = _lca_api_client.get_methods()
            _logger.info('********** /api/methods/list **********')
            _logger.info(_response)
            if 'error' in _response:
                _logger.error('LCA API: read methods error: <%s>', _response['error'])
            else:
                _logger.info('LCA API: read methods response: <%s>', _response)
        except Exception as e:
            _logger.error("LCA API: read methods error: <%s>", e)
        return _response

    @http.route(['/api/perform-assembly'], type='json', auth='public', methods=['POST'])
    def api_analyze_and_perform_assembly(self, **kw):
        payload = json.loads(request.httprequest.data)
        _lca_api_client = self._get_client_external()
        _response = {}
        try:
            _response = _lca_api_client.analyze_and_perform_assembly(payload)
            _logger.info('********** /api/methods/list **********')
            _logger.info(_response)
            if 'error' in _response:
                _logger.error('LCA API: read methods error: <%s>', _response['error'])
            else:
                _logger.info('LCA API: read methods response: <%s>', _response)
        except Exception as e:
            _logger.error("LCA API: read methods error: <%s>", e)
        return _response

    @http.route('/api/perform-assembly', website=True, auth='public', methods=['POST'], csrf=False,)
    def api_analyze_and_perform_assembly(self, **kwargs):
        json_bytes = request.httprequest.data
        json_string = json_bytes.decode('utf-8')
        data_json = json.loads(json_string)

        _api_client = self._get_client_external()
        data = _api_client.analyze_and_perform_assembly(data_json)
        return Response(json.dumps(data), content_type='application/json')

    @http.route('/api/perform-analyse', website=True, auth='public', methods=['POST'], csrf=False,)
    def api_analyze_with_new_method(self, **kwargs):
        json_bytes = request.httprequest.data
        json_string = json_bytes.decode('utf-8')
        data_json = json.loads(json_string)

        _api_client = self._get_client_external()
        data = _api_client.analyze_with_new_method(data_json)
        return Response(json.dumps(data), content_type='application/json')
