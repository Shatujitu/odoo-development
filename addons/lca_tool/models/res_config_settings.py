# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    lca_api_base_url = fields.Char("Base URL", config_parameter='lca_api.base_url', default='http://localhost:8000/api')

