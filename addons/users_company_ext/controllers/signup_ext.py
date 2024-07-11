from odoo.addons.auth_signup.controllers.main import AuthSignupHome
import logging

_logger = logging.getLogger(__name__)


class AuthSignupExtension(AuthSignupHome):
    def _signup_with_values(self, token, values):
        context = self.get_auth_signup_qcontext()
        _logger.info(f"Received values: {values}")
        _logger.info(f"Received context: {context}")
        values.update({'blood_group': context.get('name')})
        _logger.info(f"Updated values: {values}")
        super(AuthSignupExtension, self)._signup_with_values(token, values)
