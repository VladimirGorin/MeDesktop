(function() {
    function M() {
        d.getElementsByClassName('mfsWidget-tab-credit')[ 0 ].style.display = 'block';
        d.getElementsByClassName('mfsWidget-tab-rassrochka')[ 0 ].style.display = 'none';
        document.getElementById('mfsWidget-tabcontrol-rassrochka').className = '';
        document.getElementById('mfsWidget-tabcontrol-credit').className = 'mfsWidget-tabcontrol-selected';
        creditTypeSelected = !0;
    } function N() {
        d.getElementsByClassName('mfsWidget-tab-credit')[ 0 ].style.display = 'none';
        d.getElementsByClassName('mfsWidget-tab-rassrochka')[ 0 ].style.display
= 'block';
        document.getElementById('mfsWidget-tabcontrol-credit').className = '';
        document.getElementById('mfsWidget-tabcontrol-rassrochka').className = 'mfsWidget-tabcontrol-selected';
        creditTypeSelected = !1;
    } function y(a) {
        z.firstChild.innerHTML = a;
        F();
    } function F() {
        z.classList.toggle('-isOpen');
    } function T() {
        for (;r.hasChildNodes();) {
            r.removeChild(r.lastChild);
        } for (var a = 3, b = document.createDocumentFragment(), a = 3;
            a <= 24;
            a++) {
            var e = document.createElement('option');
            e.innerHTML = a;
            e.setAttribute('value', a);
            a === 1 && (e.selected
= !0);
            b.appendChild(e);
        } for (r.appendChild(b);
            t.hasChildNodes();) {
            t.removeChild(t.lastChild);
        }b = document.createDocumentFragment();
        rassrochkaAvailiablePeriod.forEach(function(a) {
            var c = document.createElement('option');
            c.setAttribute('value', a);
            c.innerHTML = a;
            a === 3 && (c.selected = !0);
            b.appendChild(c);
        });
        t.appendChild(b);
    } function U() {
        for (var a = d.querySelector('[name\x3d"customer_birth_day"]');
            a.hasChildNodes();) {
            a.removeChild(a.lastChild);
        } for (var a = 1, b = document.createDocumentFragment();
            a <= 31;) {
            var e = document.createElement('option');
            e.innerHTML = a;
            e.setAttribute('value', a < 10 ? '0' + a : a);
            a === 1 && (e.selected = !0);
            b.appendChild(e);
            a++;
        }document.querySelector('[name\x3d"customer_birth_day"]').appendChild(b);
    } function V() {
        for (var a = d.querySelector('[name\x3d"customer_birth_month"]');
            a.hasChildNodes();) {
            a.removeChild(a.lastChild);
        } for (var a = 1, b = document.createDocumentFragment();
            a <= 12;) {
            var e = document.createElement('option');
            e.innerHTML = a;
            e.setAttribute('value', a < 10 ? '0' + a : a);
            a === 1 && (e.selected = !0);
            b.appendChild(e);
            a++;
        }document.querySelector('[name\x3d"customer_birth_month"]').appendChild(b);
    }
    function W() {
        for (var a = d.querySelector('[name\x3d"customer_birth_year"]');
            a.hasChildNodes();) {
            a.removeChild(a.lastChild);
        } for (var b = (new Date()).getFullYear(), a = b - 20, b = b - 80, e = document.createDocumentFragment();
            a !== b;) {
            var A = document.createElement('option');
            A.innerHTML = a;
            A.setAttribute('value', a);
            a === 1990 && (A.selected = !0);
            e.appendChild(A);
            a--;
        }document.querySelector('[name\x3d"customer_birth_year"]').appendChild(e);
    } function v() {
        O.value = B(l);
        C.value = p;
        D.value = p;
        P.value = B(u);
        Q.value = B(w);
    } function B(a) {
        return a
= a.toFixed(2);
    } function E() {
        u = (0.025 * (l - p) * x + (l - p)) / x;
        w = (l - p) / x;
    } function X(a, b, e) {
        a.preventDefault();
        a = G();
        var c = H();
        a && !c && (a = Y(d), c = Z('POST', 'https://sfr.kiev.ua:9000/rest/widgetEndpoint/requestCredit')) && (c.onload = function() {
            try {
                if (!0 === JSON.parse(this.response).success) {
                    y(k), b && b();
                } else {
                    throw 'Error';
                }
            } catch (aa) {
                y(g), e && e();
            }
        }, c.onerror = function() {
            y(g);
            e && e();
        }, c.send(a));
    } function Z(a, b) {
        var c = new XMLHttpRequest();
        'withCredentials' in c ? (c.open(a, b, !0), c.setRequestHeader('Content-Type', 'application/json;charset\x3dUTF-8'))
            : typeof XDomainRequest !== 'undefined' ? (c = new XDomainRequest(), c.open(a, b), c.setRequestHeader('Content-Type', 'application/json;charset\x3dUTF-8')) : c = null;

        return c;
    } function H() {
        for (var a = !1, b = 0;
            b < h.length;
            b++) {
            var e = h[ b ].getAttribute('data-validate');
            var d = h[ b ].value.trim();
            if (e) {
                switch (e) {
                    case 'textLen': d.length === 0 && (m(h[ b ], 'Дане поле обов\'язково до заповнення'), a = !0);
                        break;
                    case 'userId': if (d.length !== 10 || d.length === 0 || isNaN(d)) {
                        m(h[ b ], 'Код ІПН повинен складатися з 10 цифр'), a = !0;
                    } break;
                    case 'phone': d = d.replace(/[\(\)\.\-\ ]/g,
                        '');
                        if (d.length != 13 || isNaN(d)) {
                            m(h[ b ], 'Вкажіть, будь ласка, коректний телефонний номер у форматі +380ХХХХХХХ!'), a = !0;
                        } break;
                    case 'concert': h[ b ].checked || (m(h[ b ].parentNode, 'Підтвердіть свою згоду на обробку даних!'), a = !0);
                        break;
                    case 'captcha': h[ b ].checked || (m(h[ b ].parentNode, 'Підтвердіть, що ви не робот!'), a = !0);
                }
            }
        }

        return a;
    } function G() {
        var a = document.querySelector('[name\x3d"customer_birth_day"]').value;
        var b = document.querySelector('[name\x3d"customer_birth_month"]').value;
        var d = parseInt(document.querySelector('[name\x3d"customer_birth_year"]').value)
+ 21;
        a.length == '1' && (a = '0' + a);
        b.length == '1' && (b = '0' + b);

        return new Date() < new Date(d + '-' + b + '-' + a + 'T00:00:00Z') ? (m(document.querySelector('[name\x3d"customer_birth_day"]').parentNode.parentNode, 'Кредит можливо надати особам яким виповнился 21 рік'), !1) : !0;
    } function m(a, b) {
        var c = a.parentNode;
        var d = document.createElement('span');
        d.innerHTML = b;
        d.classList.add('mfsWidget-error-msg');
        a.classList.add('-with-error');
        c.querySelector('.mfsWidget-error-msg') && c.querySelector('.mfsWidget-error-msg').remove();
        c.appendChild(d);
    }
    function Y(a) {
        var b = {};
        a = a.querySelectorAll('input, select');
        for (var c = 0;
            c < a.length;
            ++c) {
            var d = a[ c ];
            var f = d.name;
            var d = d.value;
            f && (b[ f ] = d);
        }b.productId = R;
        delete b.captcha;
        delete b.bank_name;
        delete b.concert_processing;
        b.itemPrice = parseInt(100 * parseFloat(b.item_price));
        delete b.item_price;
        b.creditTerm = parseInt(creditTypeSelected ? b.credit_term : b.credit_term_rassrochka);
        delete b.credit_term;
        b.downPayment = parseInt(100 * parseFloat(creditTypeSelected ? b.init_payment : b.init_payment_rassrochka));
        delete b.init_payment;
        b.montlyPayment = parseInt(100 * parseFloat(creditTypeSelected ? b.monthly_payment : b.monthly_payment_rassrochka));
        delete b.monthly_payment;
        b.customerName = b.customer_name;
        delete b.customer_name;
        b.customerMiddleName = b.customer_middlename;
        delete b.customer_middlename;
        b.customerSurname = b.customer_surname;
        delete b.customer_surname;
        b.identityNo = b.customer_id;
        delete b.customer_id;
        b.dayOfBirth = b.customer_birth_day;
        delete b.customer_birth_day;
        b.monthOfBirth = b.customer_birth_month;
        delete b.customer_birth_month;
        b.yearOfBirth
= b.customer_birth_year;
        delete b.customer_birth_year;
        b.phone = b.customer_phone;
        delete b.customer_phone;
        b.productName = b.item_name;
        delete b.item_name;
        b.productUrl = b.item_link;
        delete b.item_link;
        delete b.credit_term_rassrochka;
        delete b.init_payment_rassrochka;
        delete b.monthly_payment_rassrochka;
        b.creditType = creditTypeSelected;

        return JSON.stringify(b);
    } var R = null;
    var a = '';
    var a = a + '\x3cdiv class\x3d"mfsWidget-overlay"\x3e\x3cdiv class\x3d"mfsWidget-container"\x3e\x3cform class\x3d"mfsWidget-content"\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-header"\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-header-logo"\x3e\x3cimg src\x3d"https://sfr.kiev.ua:9000/images/logo_ukr.png" alt\x3d"logo"\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-header-title" \x3eСучасні фінансові рішення\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-header-secondtitle" \x3eОнлайн Розстрочка до 6 міс\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-header-subtitle"\x3e(від 5 банків - ОТП, ПУМБ та інші)\x3c/div\x3e';
    var a = a + '\x3cspan class\x3d"mfsWidget-close-btn"\x3e\x26times;\x3c/span\x3e';
    var a = a + '\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-main"\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-table"\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-table-cell -w25"\x3e\x3cimg class\x3d"mfsWidget-product-icon" src\x3d"" alt\x3d""\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-table-cell -w40"\x3e\x3cspan class\x3d"mfsWidget-product-name"\x3e\x3c/span\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-table-cell -w20"\x3eКод товару\x26nbsp;\x26nbsp;\x3cspan class\x3d"mfsWidget-product-id"\x3e\x3c/span\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-table-cell -w15"\x3e\x3cspan class\x3d"mfsWidget-product-price"\x3e\x3c/span\x3e\x26nbsp;\x26nbsp;грн.\x3c/div\x3e';
    var a = a + '\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-navigation"\x3e\x3ca href\x3d"#" class\x3d"mfsWidget-tabcontrol-selected" id\x3d"mfsWidget-tabcontrol-credit"\x3eПільговий кредит\x3c/a\x3e\x3ca href\x3d"#" id\x3d"mfsWidget-tabcontrol-rassrochka"\x3eРозрахунок розстрочки\x3c/a\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-row mfsWidget-tab-credit" style\x3d"display: none;"\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit -inline"\x3e\x3clabel class\x3d"mfsWidget-control-label -inline"\x3eТермін кредиту\x3c/label\x3e\x3cselect class\x3d"mfsWidget-control -inline" name\x3d"credit_term"\x3e\x3c/select\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit -inline"\x3e\x3clabel class\x3d"mfsWidget-control-label -inline"\x3eПерший внесок\x3c/label\x3e\x3cinput class\x3d"mfsWidget-control mfsWidget-center -inline" type\x3d"number" name\x3d"init_payment"\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit -inline"\x3e\x3clabel class\x3d"mfsWidget-control-label -inline"\x3eЩомісячний платіж\x3c/label\x3e\x3cinput class\x3d"mfsWidget-control mfsWidget-center -inline" type\x3d"text" name\x3d"monthly_payment" readonly\x3e\x3c/div\x3e';
    var a = a + '\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-row mfsWidget-tab-rassrochka" style\x3d"display: none;"\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit -inline"\x3e\x3clabel class\x3d"mfsWidget-control-label -inline"\x3eТермін кредиту\x3c/label\x3e\x3cselect class\x3d"mfsWidget-control -inline" name\x3d"credit_term_rassrochka"\x3e\x3c/select\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit -inline"\x3e\x3clabel class\x3d"mfsWidget-control-label -inline"\x3eПерший внесок\x3c/label\x3e\x3cinput class\x3d"mfsWidget-control mfsWidget-center -inline" type\x3d"number" name\x3d"init_payment_rassrochka"\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit -inline"\x3e\x3clabel class\x3d"mfsWidget-control-label -inline"\x3eЩомісячний платіж\x3c/label\x3e\x3cinput class\x3d"mfsWidget-control mfsWidget-center -inline" type\x3d"text" name\x3d"monthly_payment_rassrochka" readonly\x3e\x3c/div\x3e';
    var a = a + '\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-subtitle"\x3eЗаповнення анкети\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-row"\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-profile-col -col-1"\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit"\x3e\x3cinput class\x3d"mfsWidget-control" type\x3d"text" name\x3d"customer_name" placeholder\x3d"Ім’я*" data-validate\x3d"textLen"\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit"\x3e\x3cinput class\x3d"mfsWidget-control" type\x3d"text" name\x3d"customer_middlename" placeholder\x3d"По батькові*" data-validate\x3d"textLen"\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit"\x3e\x3cinput class\x3d"mfsWidget-control" type\x3d"text" name\x3d"customer_surname" placeholder\x3d"Прізвище*" data-validate\x3d"textLen"\x3e\x3c/div\x3e';
    var a = a + '\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-profile-col -col-2"\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit mfsWidget-center"\x3e\x3clabel class\x3d"mfsWidget-control-label"\x3eІПН\x3c/label\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit mfsWidget-center"\x3e\x3clabel class\x3d"mfsWidget-control-label"\x3eДата Народження*\x3c/label\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit mfsWidget-center"\x3e\x3clabel class\x3d"mfsWidget-control-label"\x3eМобільний телефон*\x3c/label\x3e\x3c/div\x3e';
    var a = a + '\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-profile-col -col-3"\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit"\x3e\x3cinput class\x3d"mfsWidget-control" type\x3d"number" name\x3d"customer_id" min\x3d"10" max\x3d"10" maxlength\x3d"10" data-validate\x3d"userId" onkeydown\x3d"javascript:if (this.value.length \x3e\x3d 10 \x26\x26 event.keyCode !\x3d 8 \x26\x26 event.keyCode !\x3d 46 \x26\x26 event.keyCode !\x3d 37 \x26\x26 event.keyCode !\x3d 39){return false;}"\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit"\x3e\x3cdiv style\x3d"overflow:hidden;"\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-col33" style\x3d"padding-left: 0;"\x3e\x3cselect class\x3d"mfsWidget-control" name\x3d"customer_birth_day"\x3e\x3c/select\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-col33"\x3e\x3cselect class\x3d"mfsWidget-control" name\x3d"customer_birth_month"\x3e\x3c/select\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-col33" style\x3d"padding-right: 0;"\x3e\x3cselect class\x3d"mfsWidget-control mfsWidget-control-year" name\x3d"customer_birth_year"\x3e\x3c/select\x3e\x3c/div\x3e';
    var a = a + '\x3c/div\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit"\x3e\x3cinput name\x3d"customer_phone" class\x3d"mfsWidget-control" type\x3d"tel" placeholder\x3d"Ваш телефон" value\x3d"+380" autocomplete\x3d"off" min\x3d"13" max\x3d"13" data-validate\x3d"phone" onkeydown\x3d"javascript:if (this.value.length \x3e\x3d 13 \x26\x26 event.keyCode !\x3d 8 \x26\x26 event.keyCode !\x3d 46 \x26\x26 event.keyCode !\x3d 37 \x26\x26 event.keyCode !\x3d 39){return false;}"\x3e\x3c/div\x3e';
    var a = a + '\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-profile-col -col-4"\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit"\x3e\x3clabel class\x3d"mfsWidget-control-label"\x3e\x3cspan\x3e\x3cinput class\x3d"mfsWidget-control-checkbox" type\x3d"checkbox" name\x3d"concert_processing" data-validate\x3d"concert" checked /\x3e\x3c/span\x3e Згода на \x3cspan class\x3d"mfsWidget-concert-link"\x3eобробку даних\x3c/span\x3e\x3c/label\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit"\x3e\x3clabel class\x3d"mfsWidget-control-label"\x3e\x3cspan\x3e\x3cinput class\x3d"mfsWidget-control-checkbox" type\x3d"checkbox" name\x3d"captcha" data-validate\x3d"captcha"/\x3e\x3c/span\x3eЯ не робот\x3c/label\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-control-unit"\x3e';
    var a = a + '\x3cinput class\x3d"mfsWidget-control" type\x3d"hidden" name\x3d"partner" value\x3d""\x3e';
    var a = a + '\x3cinput class\x3d"mfsWidget-control" type\x3d"hidden" name\x3d"item_price" value\x3d""\x3e';
    var a = a + '\x3cinput class\x3d"mfsWidget-control" type\x3d"hidden" name\x3d"item_link" value\x3d""\x3e';
    var a = a + '\x3cinput class\x3d"mfsWidget-control" type\x3d"hidden" name\x3d"item_name" value\x3d""\x3e';
    var a = a + '\x3cinput class\x3d"mfsWidget-submit-btn" type\x3d"submit" value\x3d"Відправити запит"\x3e';
    var a = a + '\x3c/div\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-small-text"\x3e* Розрахунок щомісячного платежу приблизний, остаточну вартість озвучить менеджер\x3c/div\x3e';
    var a = a + '\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-concert-box"\x3e\x3cdiv class\x3d"mfsWidget-concert-box-inner"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-footer"\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-footer-title"\x3eНаші партнери\x3c/div\x3e';
    var a = a + '\x3cdiv class\x3d"mfsWidget-footer-partners"\x3e';
    var a = a + '\x3c/div\x3e';
    var a = a + '\x3c/div\x3e';
    var a = a + '\x3c/form\x3e\x3c/div\x3e\x3c/div\x3e';
    var a = a + '\x3cstyle\x3e@-webkit-keyframes animatetop{from{top:-300px;opacity:0}to{top:0;opacity:1}}@keyframes mfs-animatetop{from{top:-300px;opacity:0}to{top:0;opacity:1}}#mfsCreditCalcWidget{display:none}.mfsWidget-overlay{background-color:#000;background-color:rgba(0,0,0,0.4);bottom:0;left:0;position:fixed;overflow:auto;right:0;top:0;z-index:9999}.mfsWidget-container{box-sizing:border-box;margin:5% auto;max-width:980px;position:relative;width:100%;-webkit-animation-name:mfs-animatetop;-webkit-animation-duration:.4s;animation-name:mfs-animatetop;animation-duration:.4s}.mfsWidget-content{background:#fff;box-sizing:border-box;box-shadow:0 0 20px 0 rgba(0,0,0,0.24),0 5px 5px 0 rgba(0,0,0,0.24);border-radius:5px;color:#333;display:block;font:400 12px/1.3 Arial,Helvetica,sans-serif;margin:0 auto;overflow:hidden;width:98%}.mfsWidget-header-title,.mfsWidget-header-subtitle{color:#fff;text-align:center;text-transform:uppercase}.mfsWidget-header-title{font-size:16px;font-weight:600;padding-top:5px}.mfsWidget-header-secondtitle{font-size:16px;font-weight:600;padding-top:0px}.mfsWidget-header-subtitle{font-size:18px}.mfsWidget-main{overflow:hidden;padding:20px;position:relative;margin:0}.mfsWidget-row{padding:0;margin:0}.mfsWidget-row:after{content:"";display:table;clear:both}.mfsWidget-row:first-child{border-top:none}.mfsWidget-table{display:table;vertical-align:middle;width:100%}.mfsWidget-table-cell{box-sizing:border-box;display:table-cell;font-size:14px;padding:10px;text-align:center;vertical-align:middle}.mfsWidget-table-cell.-w40{width:40%}.mfsWidget-table-cell.-w25{width:25%}.mfsWidget-table-cell.-w20{width:20%}.mfsWidget-table-cell.-w15{width:15%}.mfsWidget-profile-col,.mfsWidget-col25,.mfsWidget-col33{box-sizing:border-box;float:left}.mfsWidget-col33{width:33.3333%}.mfsWidget-profile-col,.mfsWidget-col25{width:25%}.mfsWidget-header{background:#139f96;color:#fff;height:90px;padding:10px 0;position:relative;text-align:center}.mfsWidget-profile-col.-col-1,.mfsWidget-profile-col.-col-4{margin-left:3%}.mfsWidget-profile-col.-col-2{margin-left:2%;width:15%}.mfsWidget-header-logo{background-color:#fff;border-radius:3px;display:block;left:5px;height:80px;position:absolute;top:5px;text-align:center;width:85px}.mfsWidget-subtitle{border-bottom:1px solid #ccc;font-size:16px;font-weight:600;line-height:18px;margin:20px 0 10px;padding:0 0 10px 16px;text-transform:uppercase}.mfsWidget-product-icon{max-width:80%;vertical-align:middle;max-height:120px}.mfsWidget-product-name{font-size:16px;padding:0 10px;text-align:center}.mfsWidget-product-id,.mfsWidget-product-price{font-size:15px}.mfsWidget-profile-col .mfsWidget-control-unit{margin:20px 5px 30px 5px;}.mfsWidget-control-unit{margin:20px 5px;position:relative}.mfsWidget-control-unit.-inline{display:inline-block;font-size:0;vertical-align:top}.mfsWidget-control-unit .mfsWidget-col33{padding:0 5px}.mfsWidget-col33\x3e.mfsWidget-control-year{padding-right: 0px}input.mfsWidget-control,.mfsWidget-control{background:#fff;border:1px solid #ccc;border-radius:3px;box-sizing:border-box;display:block;font:12px/18px Arial,Helvetica,sans-serif;height:38px;padding:0 8px;outline:0 none;text-align:left;width:100%;-webkit-appearance:auto !important;}.mfsWidget-control:hover{border:1px solid #139f96;transition:border-color .3s ease-in-out;-webkit-transition:border-color .3s ease-in-out;-moz-transition:border-color .3s ease-in-out}.mfsWidget-control:focus{border:1px solid #139f96;outline:0}.mfsWidget-control[readonly]{background-color:#f1f1f1}.mfsWidget-control[readonly]:focus,.mfsWidget-control[readonly]:hover{border-color:#ccc}.mfsWidget-control.-inline{display:inline-block;width:100px}.mfsWidget-control.-with-error{border-color:#c42231}.mfsWidget-control-label{color:#1f1f1f;box-sizing:border-box;display:block;font-size:12px;line-height:18px;padding:10px 0;white-space:nowrap}.mfsWidget-control-label.-inline{display:inline-block;padding:10px 15px 10px 20px}.mfsWidget-control-checkbox{margin:0 10px;padding:0;vertical-align:middle;-webkit-appearance: auto !important;}.mfsWidget-submit-btn,.mfsWidget-accept-btn,.mfsWidget-decline-btn{box-sizing:border-box;border:none;border-radius:3px;cursor:pointer;font-size:15px;height:38px;line-height:18px;padding:10px;text-align:center}.mfsWidget-submit-btn{display:block;margin:auto;max-width:200px;width:100%}.mfsWidget-decline-btn{border:1px solid #139f96;color:#139f96}.mfsWidget-submit-btn,.mfsWidget-accept-btn{background:#139f96;color:#fff}.mfsWidget-accept-btn,.mfsWidget-decline-btn{display:inline-block;font-size:13px;margin-left:20px;width:106px;vertical-align:top}.mfsWidget-submit-btn:hover{-webkit-transition:background .3s ease-in-out;-moz-transition:background .3s ease-in-out;transition:background-color .3s ease-in-out}.mfsWidget-submit-btn:active{box-shadow:inset 0 1px 3px rgba(0,0,0,0.5)}.mfsWidget-close-btn{color:#fff;cursor:pointer;line-height:1;font-size:28px;font-weight:700;position:absolute;right:10px;top:3px}.mfsWidget-footer{background:#f2f2f2;border-top:1px solid #ccc;padding:25px 15px;text-align:center}.mfsWidget-footer-title{color:#139f96;font-size:18px;margin-bottom:10px;text-transform:uppercase}.mfsWidget-footer-partners{font-size:0;height: 109px;}.mfsWidget-footer-partner{display:inline-block;padding:20px 0;text-align:center;vertical-align:middle;width:20%}.mfsWidget-footer-partner-icon{max-width:80%}.mfsWidget-concert-link{color:#139f96;cursor:pointer;text-decoration:underline}.mfsWidget-big-text{font-size:22px;font-weight:600;left:0;right:0;line-height:28px;position:absolute;text-align:center;top:50%;transform:translateY(-50%)}.mfsWidget-small-text{clear:both;font-size:11px;line-height:1;padding-top:10px;text-align:left}.mfsWidget-concert-box{background:#fff;box-sizing:border-box;content:"";height:0;left:0;position:absolute;overflow-y:auto;top:0;transition:all .3s ease 0;visibility:hidden;width:100%;z-index:1}.mfsWidget-concert-box.-isOpen{height:100%;visibility:visible}.mfsWidget-concert-box-inner{padding:20px}.mfsWidget-concert-buttons{border-bottom:1px solid #ccc;padding-bottom:20px;margin-bottom:20px;text-align:right}.mfsWidget-center{text-align:center}.mfsWidget-error-msg{color:#c42231;font-size:11px;left:0;line-height:1.1;padding-top:3px;position:absolute;font-style:italic}.mfsWidget-control[type\x3dnumber]::-webkit-inner-spin-button,.mfsWidget-control[type\x3dnumber]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}@media only screen and (max-width: 980px){.mfsWidget-control-label.-inline{padding-left:10px;padding-right:10px;width:155px}.mfsWidget-row.mfsWidget-center{text-align:left}.mfsWidget-profile-col.-col-1,.mfsWidget-profile-col.-col-4{margin-left:0;width:25%}.mfsWidget-profile-col.-col-2{margin-left:0;width:25%}}@media only screen and (max-width : 768px){.mfsWidget-header{padding-left:100px}.mfsWidget-header-title{font-size:20px}.mfsWidget-header-subtitle{font-size:16px}.mfsWidget-table{display:block;font-size:0}.mfsWidget-table-cell{display:inline-block;width:50%!important}.mfsWidget-profile-col.-col-1,.mfsWidget-profile-col.-col-4{margin-left:30%;width:70%}.mfsWidget-profile-col.-col-2{width:30%}.mfsWidget-profile-col.-col-3{width:70%}.mfsWidget-submit-btn{margin:0}.mfsWidget-profile-col.-col-2 .mfsWidget-control-unit{text-align:left}.mfsWidget-profile-col.-col-2 .mfsWidget-control-label{overflow:hidden;text-overflow:ellipsis}}@media only screen and (max-width : 480px){.mfsWidget-main{padding:10px 8px}.mfsWidget-header-title,.mfsWidget-header-subtitle{display:none}.mfsWidget-table{text-align:center}.mfsWidget-table-cell{width:100%!important}.mfsWidget-footer-partner{width:33.3333%}.mfsWidget-footer-partner-icon{max-width:90%}.mfsWidget-profile-col.-col-1,.mfsWidget-profile-col.-col-4{margin-left:0;width:100%}.mfsWidget-profile-col.-col-2{width:40%}.mfsWidget-profile-col.-col-3{width:60%}}@media only screen and (max-width : 360px){.mfsWidget-control-label.-inline{padding-left:0;padding-right:0;width:120px}}#mfsWidget-tabcontrol-credit,#mfsWidget-tabcontrol-rassrochka{width: auto;padding: 8px 16px;padding-bottom: 8px;padding-top: 8px;}.mfsWidget-navigation a.mfsWidget-tabcontrol-selected{background-color: #139f96 !important;color: #fff !important;}.mfsWidget-navigation{font-size:16px;font-weight:600;line-height:18px;padding: 0 0 6px;text-transform: uppercase;border-bottom: 1px solid #139f96;margin: 20px 0 10px;}.mfsWidget-navigation a{color:#333;text-decoration:none;}@media screen and (max-width: 767px) {#mfsWidget-tabcontrol-credit, #mfsWidget-tabcontrol-rassrochka {display: block;text-align: center;}}';
    var f = '';
    var f = f + '\x3cdiv class\x3d"mfsWidget-concert-buttons"\x3e';
    var f = f + '\x3cspan class\x3d"mfsWidget-accept-btn"\x3eЗгоден\x3c/span\x3e';
    var f = f + '\x3cspan class\x3d"mfsWidget-decline-btn"\x3eЗакрити\x3c/span\x3e';
    var f = f + '\x3c/div\x3e';
    var f = f + '\x3cdiv class\x3d"mfsWidget-center"\x3eОсобисті дані\x3c/div\x3e';
    var f = f + '\x3cdiv\x3eДП "СУЧАСНІ ФІНАНСОВІ РІШЕННЯ", ідентифікаційний код за ЄДРПОУ 35856926 та ТОВ "СМАРТ-ФІНАНС", ідентифікаційний код за ЄДРПОУ 37208475 (надалі - Товариства) та банківські установи, які на підставі банківської ліцензії мають право надавати банківські послуги, зокрема, надавати кредити фізичним особам,: а саме АТ "ОТП Банк", ідентифікаційний код за ЄДРПОУ 21685166, ПАТ "УкрСиббанк" ідентифікаційний код за ЄДРПОУ 09807750, ФІЛІЯ ПУМБ В М.КИЇВ, ідентифікаційний код за ЄДРПОУ 39696377, ПАТ "Альфа-Банк" ідентифікаційний код за ЄДРПОУ 23494714, ПаТ "Банк Кліринговий Дім" ідентифікаційний код за ЄДРПОУ 21665382;АТ КБ "Глобус" Код ЄДРПОУ 35591059;ТОВ «Кардсервіс» ідентифікаційний код за ЄДРПОУ 39551837;ТОВ "ФІНАНСОВА КОМПАНІЯ "ЦЕНТР ФІНАНСОВИХ РІШЕНЬ" ідентифікаційний код за ЄДРПОУ 35725063;ПАТ "Ідея Банк" ідентифікаційний код за ЄДРПОУ 19390819);ТОВ «СЛОН КРЕДИТ» Код за ЄДРПОУ 42350798;ТОВ "СУЧАСНИЙ ФАКТОРИНГ" ідентифікаційний код за ЄДРПОУ 35310044;ТОВ "ГЛОБАЛ КРЕДИТ" ідентифікаційний код за ЄДРПОУ 38266014 (надалі окремо - Банк та/або Фінансова компанія, а у сукупності - Банки та/або Фінансові компанії).\x3c/div\x3e';
    var f = f + '\x3cdiv class\x3d"mfsWidget-center"\x3eЗгода-дозвіл на обробку персональних даних\x3c/div\x3e';
    var f = f + '\x3cdiv\x3eПідписанням цієї згоди я, (надалі – Власник персональних даних), надаю свою згоду/дозвіл на:\x3cbr\x3e- обробкуБанками, Товариствами та Фінансовими компаніями, вказаними вище, Персональних даних (будь-якої інформації, що стосується мене, в тому числі, однак не виключно інформації щодо прізвища, власного імені, по батькові, паспортних даних, ідентифікаційного коду, дати та місця народження, громадянства, адреси проживання та реєстрації, сімейного, соціального, майновогостановища, освіти, професії, доходів, номерів контактних телефонів/факсів, адреси електронної пошти, тощо (надалі - "Персональні дані")) Власника персональних даних з метою: 1) здійснення Банками, Товариствами та Фінансовими компаніями, вказаними вище, своєї фінансово-господарської діяльності, пропонування повного кола послуг Банками, Товариствами та Фінансовими компаніями, вказаними вище, та/або третіми особами (будь-які особи з якими Банки та інші фінансови установи перебувають в договірних відносинах (надалі - "Треті особи"),у тому числі шляхом здійснення прямих контактів із Власником персональних даних за допомогою засобів зв\'язку, та/або надання послуг Банками, Товариствами та Фінансовими компаніями, вказаними вище, та Третіми особами, в тому числі укладення/зміни та/або виконання будь-яких договорів, укладених із Банками та/або Фінансовими компаніями та/або Третіми особами та/або у зв\'язку з ними;2) надання Третіми особами послуг Банкам та/або Фінансовим компаніям длявиконання ним своїх функцій та/або для виконання укладених Банками та/або Фінансовими компаніями із Третіми особами договорів, у т.ч. про відступлення права вимоги;3) захисту Банками та/або Фінансовими компаніями своїх законних прав та інтересів, у т.ч. передача даних фінансовим установам (ураховуючи, але не виключно, страховим та факторинговим компаніям);\x3c/div\x3e';
    var f = f + '\x3cdiv\x3e4) здійснення Банками та/або Фінансовими компаніями прав та виконання обов\'язків за іншими договірними відносинами між Банками та/або Фінансовими компаніями та Клієнтами;\x3c/div\x3e';
    var f = f + '\x3cdiv\x3e5) здійснення Банками та/або Фінансовими компаніями інших дій, що не заборонені законодавством України та обираються Банками та/або Фінансовими компаніями на власний розсуд;\x3c/div\x3e';
    var f = f + '\x3cdiv\x3e6) в інших випадках, передбачених чинним законодавством України.\x3cbr\x3e- передачу (поширення), у т.ч. транскордонну, Банками, Товариствами та Фінансовими компаніями, вказаними вище Персональних дани х Третім особам, зміну, знищення Персональних даних або обмеження доступу до них, включення Персональних даних до бази Персональних даних Банків, Товариств та Фінансових компаній, вказаних вище з метою зазначеною в п.п.1-6 ціє згоди/дозволу табез необхідності надання Власнику персональних даних письмового повідомлення про здійснення зазначених дій.\x3cbr\x3e Зазначена Згода надається на строк, який є необхідним відповідно до мети обробки Персональних даних, передбаченої даною Згодо ю, однак у будь-якому випадку до моменту припинення Банків, Товариств та Фінансових компаній, вказаних вище та/або їх правонаступників.\x3cbr\x3e Підписанням цієї Згоди Власник персональних даних підтверджує, що він письмово повідомлений про включення Персональних даних до бази персональних даних Банків, Товариств та Фінансових компаній, вказаних вище, про права, передбачені Законом України "Про захист персональних даних" від 01.06.2010 року, про мету збору даних та осіб, яким передаються Персональні дані,засвідчує, що склад та зміст Персональних даних є відповідним визначеній вище меті обробки Персональних даних.\x3cbr\x3e Застереження: Термін "обробка персональних даних" визначається чинним законодавством, зокрема Законом, та означає будь-яку дію або сукупність дій, таких як збирання, реєстрацію, накопичення, зберігання, адаптування,зміну, поновлення, використання і поширення (розповсюдження, реалізацію, передачу), знеособлення, знищення персональних даних, володільцем яких є Банки, Товариства та Фінансові компанії, вказані вище та/чи Треті особи,у тому числі з використанням інформаційних (автоматизованих) систем. Своїм підписом клієнт підтверджує свою згоду на доступ Банками, Товариствами та Фінансовими компаніями, вказаними вище до його кредитно ї історії, збір, зберігання, використання та розповсюдження через Бюро кредитних історій інформації про нього (в тому числі інформації, що міститься у державних реєстрах та інших базах даних публічного використання) у порядку, визначеному Законом України "Про організацію формування та обігу кредитних історій". Також, своїм підписом клієнт підтверджує що він проінформований Банками, Товариствами та Фінансовими компаніями, вказаними вище, про те, що інформація про назву та адресу Бюро кредитних історій, до яких Банки, Товариства та Фінансові компанії, вказані вище, будуть передавати інформацію для формування кредитних історій, опублікована в газеті "Голос України", а також зазначену вище інформацію можна отримати за телефонами цілодобової клієнтської підтримки Банків, Товариств та Фінансових компаній, вказаних вище, та/або на офіційному сайті Банків та інших фінансових установ;та що він та члени його сім\'ї не пов\'язані з політичною/публічною діяльністю та не має фінансового контролера.\x3cbr\x3e З відправленням анкети Власник персональних даних засвідчує, що розуміє та погоджується з режимом використання інформації, що зазначена у згоді та н е матиме до Банків, Товариств та Фінансових компаній, вказаних вище, жодних претензій в разі вчинення останніми будь-якої дії, зазначеної у згоді.\x3c/div\x3e';
    var f = f + '\x3c/div\x3e';
    var k = '';
    var k = k + '\x3cdiv class\x3d"mfsWidget-big-text"\x3e';
    var k = k + '\x3cdiv\x3e\x3cimg src\x3d"https://sfr.kiev.ua:9000/images/smile.jpg"\x3e\x3c/div\x3e';
    var k = k + 'Заявку відправлено! \x3cbr\x3e Найближчим часом з Вами зв\'яжеться наш співробітник! \x3cbr\x3e Залишайтеся на зв\'язку! \x3cbr\x3e Гарного дня! ';
    var k = k + '\x3c/div\x3e';
    var g = '';
    var g = g + '\x3cdiv class\x3d"mfsWidget-big-text"\x3e';
    var g = g + '\x3cdiv\x3e\x3cimg src\x3d"https://sfr.kiev.ua:9000/images/smile_error.jpg"\x3e\x3c/div\x3e';
    var g = g + 'Cталася помилка!\x3cbr/\x3eПросимо повторно відправити заявку!\x3cbr/\x3eВибачте за не зручності!';
    var g = g + '\x3c/div\x3e';
    var x = 3;
    var p = 0;
    var l = 0;
    var u = 0;
    var w = 0;
    var d;
    var z;
    var r;
    var t;
    var O;
    var C;
    var D;
    var P;
    var Q;
    var S;
    var h;
    var I = !1;
    var J = !1;
    creditTypeSelected = !0;
    rassrochkaAvailiablePeriod = [ 3, 6 ];
    window.MfsCreditCalcWidget = {init: function(c) {
        var b = this;
        var e = document.createElement('div');
        e.id = 'mfsCreditCalcWidget';
        e.innerHTML = a;
        document.body.appendChild(e);
        d = document.getElementById('mfsCreditCalcWidget');
        O = d.querySelector('.mfsWidget-control[name\x3d"item_price"]');
        C = d.querySelector('.mfsWidget-control[name\x3d"init_payment"]');
        D = d.querySelector('.mfsWidget-control[name\x3d"init_payment_rassrochka"]');
        P = d.querySelector('.mfsWidget-control[name\x3d"monthly_payment"]');
        Q = d.querySelector('.mfsWidget-control[name\x3d"monthly_payment_rassrochka"]');
        S = d.querySelector('.mfsWidget-control-checkbox[name\x3d"concert_processing"]');
        r = d.querySelector('.mfsWidget-control[name\x3d"credit_term"]');
        t = d.querySelector('.mfsWidget-control[name\x3d"credit_term_rassrochka"]');
        z = d.querySelector('.mfsWidget-concert-box');
        h = d.querySelectorAll('[data-validate]');
        d.querySelector('.mfsWidget-control[name\x3d"init_payment"]');
        d.querySelector('.mfsWidget-control[name\x3d"init_payment"]');
        d.querySelector('.mfsWidget-control[name\x3d"init_payment"]');
        l = d.querySelector('.mfsWidget-control[name\x3d"init_payment"]');
        var g = void 0;
        var k = void 0;
        var m = void 0;
        var u = void 0;
        var w = void 0;
        var e = d.querySelector('.mfsWidget-close-btn');
        var G = d.querySelector('.mfsWidget-submit-btn');
        var H = d.querySelector('.mfsWidget-concert-link');
        if (typeof c === 'object') {
            c.selector && c.selector.length && (g = document.querySelectorAll(c.selector));
            c.partner && c.partner.length && (document.querySelector('.mfsWidget-control[name\x3d"partner"]').value
= c.partner);
            c.onErrorSubmitCallback && typeof c.onErrorSubmitCallback === 'function' && (k = c.onErrorSubmitCallback);
            c.onSuccessSubmitCallback && typeof c.onSuccessSubmitCallback === 'function' && (m = c.onSuccessSubmitCallback);
            c.onCloseCallback && typeof c.onCloseCallback === 'function' && (u = c.onCloseCallback);
            c.onOpenCallback && typeof c.onOpenCallback === 'function' && (w = c.onOpenCallback);
            c.rassrochkaEnabled && typeof c.rassrochkaEnabled === 'boolean' && (I = c.rassrochkaEnabled);
            if (!I) {
                var q = document.getElementById('mfsWidget-tabcontrol-rassrochka');
                q.parentNode.removeChild(q);
            }c.creditTypeDisabled && typeof c.creditTypeDisabled === 'boolean' && (J = c.creditTypeDisabled);
            J && (q = document.getElementById('mfsWidget-tabcontrol-credit'), q.parentNode.removeChild(q));
            c.banks && Array.isArray(c.banks) || (c.banks = [ 'factoring', 'creditmarket', 'otp', 'alpha', 'slon' ]);
            if (c.banks && Array.isArray(c.banks)) {
                c.banks.push('slon');
                for (var q = document.querySelector('.mfsWidget-footer-partners'), n = null, K = 0;
                    K < c.banks.length;
                    K++) {
                    switch (c.banks[ K ]) {
                        case 'idea': n = '/idea.png';
                            break;
                        case 'factoring': n = '/factoring.png';
                            break;
                        case 'creditmarket': n = '/creditmarket.png';
                            break;
                        case 'otp': n = '/otp.png';
                            break;
                        case 'pumb': n = '/pumb.png';
                            break;
                        case 'alpha': n = '/alpha.png';
                            break;
                        case 'slon': n = '/slon.png';
                    } if (n != null && q != null) {
                        var L = document.createElement('span');
                        L.className = 'mfsWidget-footer-partner';
                        L.innerHTML = '\x3cimg class\x3d"mfsWidget-footer-partner-icon" src\x3d"https://sfr.kiev.ua:9000/images' + n + '" alt\x3d""\x3e';
                        q.appendChild(L);
                    }
                }
            }c.rassrochkaAvailiablePeriod && Array.isArray(c.rassrochkaAvailiablePeriod)
&& (rassrochkaAvailiablePeriod = c.rassrochkaAvailiablePeriod);
        } if (g && g.length) {
            for (c = 0;
                c < g.length;
                c++) {
                g[ c ].addEventListener('click', function(a) {
                    a.preventDefault();
                    a = this.getAttribute('data-product-image') ? this.getAttribute('data-product-image').trim() : '';
                    var c = this.getAttribute('data-product-id') ? this.getAttribute('data-product-id').trim() : '';
                    var e = this.getAttribute('data-product-name') ? this.getAttribute('data-product-name').trim() : '';
                    var f = this.getAttribute('data-product-link') ? this.getAttribute('data-product-link').trim()
                        : '';
                    R = c;
                    l = parseFloat(this.getAttribute('data-product-price'));
                    d.querySelector('.mfsWidget-control[name\x3d"item_link"]').value = f;
                    d.querySelector('.mfsWidget-control[name\x3d"item_name"]').value = e;
                    d.querySelector('.mfsWidget-control[name\x3d"item_price"]').value = l;
                    d.querySelector('.mfsWidget-product-icon').setAttribute('src', a);
                    d.querySelector('.mfsWidget-product-name').innerHTML = e;
                    d.querySelector('.mfsWidget-product-id').innerHTML = c;
                    d.querySelector('.mfsWidget-product-price').innerHTML = B(l);
                    [ C, D ].forEach(function(a) {
                        a.addEventListener('keyup',
                            function() {
                                var a = parseInt(0.6 * l);
                                parseInt(this.value) > a && (this.value = a.toString(), p = a, E(), v());
                            });
                    });
                    T();
                    U();
                    V();
                    W();
                    E();
                    v();
                    b.open(w);
                });
            }
        } for (c = 0;
            c < h.length;
            c++) {
            h[ c ].onfocus = function() {
                var a = this.nextElementSibling;
                a && a.remove();
                this.getAttribute('name') === 'customer_phone' && (a = this.value.trim().length, this.setSelectionRange(a, a));
                this.classList.remove('-with-error');
            };
        }e.addEventListener('click', function() {
            b.close(u);
        });
        G.addEventListener('click', function(a) {
            X(a, m, k);
        });
        [ r, t ].forEach(function(a) {
            a.addEventListener('change',
                function() {
                    x = parseInt(this.value, 10);
                    E();
                    v();
                });
        });
        [ C, D ].forEach(function(a) {
            a.addEventListener('input', function() {
                var a = parseFloat(this.value);
                p = isNaN(a) ? 0 : a;
                E();
                v();
            });
        });
        H.addEventListener('click', function(a) {
            a.preventDefault();
            y(f);
        });
        document.addEventListener('click', function(a) {
            a.target && a.target.classList.contains('mfsWidget-accept-btn') && (F(), S.checked = !0);
        });
        document.addEventListener('click', function(a) {
            a.target && a.target.classList.contains('mfsWidget-decline-btn') && F();
        });
        I && (N(), document.getElementById('mfsWidget-tabcontrol-rassrochka').addEventListener('click',
            function(a) {
                a.preventDefault();
                N();
            }));
        J || (M(), document.getElementById('mfsWidget-tabcontrol-credit').addEventListener('click', function(a) {
            a.preventDefault();
            M();
        }));
    }, open: function(a) {
        d.style.display = 'block';
        a && a();
    }, close: function(a) {
        d.style.display = 'none';
        x = 3;
        l = u = p = 0;
        v();
        z.classList.remove('-isOpen');
        a && a();
    }};
}());
