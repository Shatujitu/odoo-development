/** @odoo-module **/

import publicWidget from 'web.public.widget';

publicWidget.registry.CaseStudy = publicWidget.Widget.extend({
    selector: '.s_case_study',
    start() {
      let caseStudy = this.el.querySelector('#s_case_study_row')
      // caseStudy.innerHTML = '<div>Hello World</div>'
      this._rpc({
        route: '/case-study',
        params: {}
      }).then(data => {
        let html = ``
        data.forEach(sample => {
          html += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                        <div class="card h-100"
                             data-bs-toggle="modal"
                             data-bs-target="#case-study-${sample.id}">
                            <div class="card-image">
                                <img class="object-fit" src="data:image/png;base64,${sample.feature_image}" />
                            </div>
                            <div class="card-title px-3 pt-3">
                                <h5 class="text-primary">${sample.name ? sample.name : ''}</h5>
                            </div>
                            <div class="card-text px-3">
                                <p style="text-align: justify;">${sample.title ? sample.title : ''}</p>
                            </div>
                        </div>
                        <div class="modal fade" id="case-study-${sample.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelOne" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-body">
                                  <div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="case-header">
                                    <h4 class="text-center text-primary">${sample.name ? sample.name : ''}</h4>
                                  </div>
                                  <hr></hr>
                                  <div class="case-title">
                                    <h3 class="text-primary">${sample.title ? sample.title : ''}</h3>
                                  </div>
                                  <div class="case-image py-2">
                                    <img class="img-fluid" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 20px;" src="data:image/png;base64,${sample.content_image}" onerror="this.style.display='none';" />
                                  </div>
                                  <div class="case-text pt-2" style="text-align: justify;">
                                    ${sample.content ? sample.content : ''}
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>`
        })
        caseStudy.innerHTML = html
      })
    },
});
export default publicWidget.registry.CaseStudy;
