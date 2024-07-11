/** @odoo-module **/

import publicWidget from 'web.public.widget';

publicWidget.registry.WorkPackage = publicWidget.Widget.extend({
    selector: '.s_work_package',
    start() {
      let workPackage = this.el.querySelector('#s_work_package_row')
      // workPackage.innerHTML = '<div>Hello World</div>'
      this._rpc({
        route: '/work-package',
        params: {}
      }).then(data => {
        let html = ``
        data.forEach(sample => {
          html += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                        <div class="card h-100 p-3"
                             data-bs-toggle="modal"
                             data-bs-target="#work-package-${sample.id}">
                            <div class="d-flex align-items-center gap-2">
                               <div class="card-icon">
                                   <img class="object-fit" src="data:image/png;base64,${sample.icon}" />
                               </div>
                               <div class="card-name">
                                   <h6>${sample.name ? sample.name : ''}</h6>
                               </div>
                            </div>
                            <div class="card-title pt-2">
                                <h5>${sample.title ? sample.title : ''}</h5>
                            </div>
                        </div>
                        <div class="modal fade" id="work-package-${sample.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelOne" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div class="modal-content">
                              <div class="modal-body">
                                 <div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                 </div>
                                 <div class="d-flex justify-content-center align-items-center gap-2">
                                    <div class="card-icon">
                                        <img class="img-fluid" style="width: 100px" src="data:image/png;base64,${sample.icon}" />
                                    </div>
                                    <div class="card-name bg-light pt-2 px-3 rounded-2">
                                         <h5>${sample.name ? sample.name : ''}</h5>
                                    </div>
                                 </div>
                                 <div class="pt-3 pb-2 title-text-info">
                                    <h3>${sample.title ? sample.title : ''}</h3>
                                 </div>
                                 <div>
                                    ${sample.content ? sample.content : ''}
                                 </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>`
        })
        workPackage.innerHTML = html
      })
    },
});
export default publicWidget.registry.WorkPackage;
