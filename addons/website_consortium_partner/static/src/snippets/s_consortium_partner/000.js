/** @odoo-module **/

import publicWidget from 'web.public.widget';

publicWidget.registry.ConsortiumPartner = publicWidget.Widget.extend({
    selector: '.s_consortium_partner',
    start() {
      let consortiumPartner = this.el.querySelector('#s_consortium_partner_row')
      // consortiumPartner.innerHTML = '<div>Hello World</div>'
      this._rpc({
        route: '/consortium-partner',
        params: {}
      }).then(data => {
        let html = ``
        data.forEach(sample => {
          html += `<div class="col-6 col-sm-4 col-md-3 col-lg-2 p-2">
                      <div class="card h-100 p-3" data-bs-toggle="modal" data-bs-target="#consortium-partner-${sample.id}">
                        <div class="d-flex align-items-center">
                          <div class="card-logo">
                            <img class="object-fit" src="data:image/png;base64,${sample.logo}" />
                          </div>
                        </div>
                        <div class="card-name pt-3">
                          <h6>${sample.name ? sample.name : ''}</h6>
                        </div>
                      </div>
                      <div class="modal fade" id="consortium-partner-${sample.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelOne" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                          <div class="modal-content">
                            <div class="modal-body">
                              <div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="d-flex justify-content-center align-items-center">
                                <div class="card-logo">
                                  <img class="img-fluid" style="width: 200px; border-radius: 8px; border: 1px dashed #6AA3DE; padding: 20px" src="data:image/png;base64,${sample.logo}" />
                                </div>
                              </div>
                              <div class="pt-3 pb-2 title-text-info">
                                <h3>${sample.name ? sample.name : ''}</h3>
                              </div>
                              <div>
                                ${sample.content ? sample.content : ''}
                              </div>
                              <div>
                                <a href="${sample.website ? sample.website : ''}" target="_blank">Visit Website</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                   </div>`
        })
        consortiumPartner.innerHTML = html
      })
    },
});
export default publicWidget.registry.ConsortiumPartner;
