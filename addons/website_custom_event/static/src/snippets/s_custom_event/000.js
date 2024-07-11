/** @odoo-module **/

import publicWidget from 'web.public.widget';

publicWidget.registry.CustomEvent = publicWidget.Widget.extend({
    selector: '.s_custom_event',
    start() {
        let customEvent = this.el.querySelector('#s_custom_event_row')
        this._rpc({
            route: '/custom-event-blogs',
            params: {}
        }).then(data => {
            let html = ``
            html +=`<div class="col-md-4 col-lg-3 order-2 order-md-1 my-4 my-md-0">
                        <div class="d-grid gap-3">
                            <div class="d-grid gap-1">
                                <div class="image-container">
                                    <img class="w-100 rounded" style="aspect-ratio: 3/2; object-fit: cover;"
                                         src="${data.other_blogs[0]?.background_image}" alt="" onerror="this.style.display='none';" />
                                </div>
                                <div class="d-flex gap-2">
                                    <img src="/website_custom_event/static/src/img/custom_event_calender_icon.svg" alt="calender_icon"/>
                                    <span>${data.other_blogs[0]?.output.published_date ? new Date(data.other_blogs[0].output.published_date).toLocaleDateString('en-UK', { day: 'numeric', month: 'long', year: 'numeric'}) : ''}</span>
                                </div>
                                <div>
                                    <h5>
                                        <a href="${data.other_blogs[0]?.output.website_url}">${data.other_blogs[0]?.output.name ? data.other_blogs[0].output.name.substring(0, 50) + '...' : ''}</a>
                                    </h5>
                                </div>
                            </div>
                            <div class="d-grid gap-1">
                                <div class="image-container">
                                    <img class="w-100 rounded" style="aspect-ratio: 3/2; object-fit: cover;"
                                         src="${data.other_blogs[1]?.background_image}" alt="" onerror="this.style.display='none';" />
                                </div>
                                <div class="d-flex gap-2">
                                    <img src="/website_custom_event/static/src/img/custom_event_calender_icon.svg" alt="calender_icon" />
                                    <span>${data.other_blogs[1]?.output.published_date ? new Date(data.other_blogs[1].output.published_date).toLocaleDateString('en-UK', { day: 'numeric', month: 'long', year: 'numeric'}) : ''}</span>                         
                                </div>
                                <div>
                                    <h5>
                                        <a href="${data.other_blogs[1]?.output.website_url}">${data.other_blogs[1]?.output.name ? data.other_blogs[1].output.name.substring(0, 50) + '...' : ''}</a>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-6 order-1 order-md-2">
                        <div class="d-grid gap-1">
                            <div class="image-container">
                                <img class="w-100 rounded"
                                     src="${data.featured_blog?.background_image}" alt="" onerror="this.style.display='none';" />
                            </div>
                            <div class="d-flex gap-2">
                                <img src="/website_custom_event/static/src/img/custom_event_calender_icon.svg" alt="calendar_icon"/>
                                <span>${data.featured_blog?.output.published_date ? new Date(data.featured_blog.output.published_date).toLocaleDateString('en-UK', { day: 'numeric', month: 'long', year: 'numeric'}) : ''}</span>
                            </div>
                            <div>
                                <h4>
                                    <a href="${data.featured_blog?.output.website_url}">${data.featured_blog?.output.name ? data.featured_blog.output.name.substring(0, 100) : ''}</a>
                                </h4>
                            </div>
                            <div style="max-height: 4.2em; overflow: hidden; text-overflow: ellipsis; white-space: normal;">
                                <p>${data.featured_blog?.output.content ? data.featured_blog.output.content : ''}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-3 order-3">
                        <div class="w-100 h-100 rounded" style="background: #FFF; box-shadow: 0px 2px 16px 0px rgba(54, 124, 193, 0.50);">                         
                            <div class="image-container w-100" style="position: relative;">
                                <img class="w-100 rounded-top"
                                     src="data:image/png;base64,${data.featured_event?.banner_image}" alt="" onerror="this.style.display='none';" />
                                <div class="w-100 rounded-top bg-primary"
                                     style="position: absolute; top: 0; left: 0; aspect-ratio: 3/2; opacity: 0.6; pointer-events: none; z-index: 2"></div>
                            </div>
                            <div class="d-grid gap-3 py-3">
                                <div class="px-3 text-primary">
                                    <h4>
                                        <a href="${data.featured_event?.id ? '/custom-event/' + data.featured_event.id : '/'}">${data.featured_event?.title ? data.featured_event?.title.substring(0, 60) + '...' : 'No upcoming event'}</a>
                                    </h4>
                                </div>
                                <div class="px-3">
                                    <div class="px-2 border-start border-primary border-2">
                                        <div class="text-primary">
                                            <h5>
                                                <span>Date: </span>
                                                <span>${data.featured_event?.datetime ? new Date(data.featured_event?.datetime).toLocaleDateString('en-UK', { day: 'numeric', month: 'long', year: 'numeric'}) : 'Upcoming...'}</span>
                                            </h5>
                                            
                                        </div>
                                        <div class="">
                                            <h6>
                                                <span>Time: </span>
                                                <span>${data.featured_event?.time ? data.featured_event.time: 'Upcoming...'}</span>
                                            </h6>
                                        </div>
                                        <div class="">
                                            <h6>
                                                <span>Time Zone: </span>
                                                <span>${data.featured_event?.timezone ? data.featured_event.timezone: 'Upcoming...'}</span>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="px-3">
                                    <span class="text-primary">Venue:</span>
                                    <span>${data.featured_event?.venue ? data.featured_event?.venue : 'Upcoming...'}</span>
                                </div>
                                <div class="px-3">
                                    <a type="button" class="btn btn-primary" href="${data.featured_event?.link ? data.featured_event?.link : '/'}" target="_blank">
                                        <span>${data.featured_event?.button_id ? data.featured_event?.button_id[1] : 'Event'}</span>
                                    </a>
                                </div>
                            </div>    
                        </div>
                    </div>`
                customEvent.innerHTML = html
        })
    },
});
export default publicWidget.registry.CustomEvent;
