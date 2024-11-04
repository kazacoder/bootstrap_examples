'use strict';

(() => {

    $('#form').find('input').attr('required', 'required');
    $('#form').attr('novalidate');

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

    let loader = $('.loader')
    $('#redeem').click(function () {
        let promoInput =  $('#promo-code')
        let promoCode =  promoInput.val()
        let url = `https://testologia.ru/promo-code/?name=${promoCode}`;
        // let http = new XMLHttpRequest()
        // http.open('get', url);
        // http.send()
        promoInput.removeClass('border border-danger')
        //
        // http.onreadystatechange = function () {
        //     if (http.readyState === 4 && http.status === 200) {
        //         let result = null
        //         try {
        //             result = JSON.parse(http.responseText)
        //         } catch (e) {}
        //
        //         let promoElement = $('#promocode')
        //         let totalEl = promoElement.next('li').find('strong')
        //         let total = `${totalEl.text()}`
        //         if (result && result.hasOwnProperty('amount')) {
        //             promoElement.removeClass('d-none').addClass('d-flex')
        //             promoElement.find('span.text-success').text(`-$${result.amount}`)
        //             promoElement.find('small').text(promoCode.toUpperCase())
        //             totalEl.text(`$${total.slice(1) - result.amount}`)
        //         } else {
        //             promoElement.removeClass('d-flex').addClass('d-none')
        //             totalEl.text(`$25`)
        //             promoInput.addClass('border border-danger')
        //         }
        //     }
        // }

        loader.css('display', 'flex');

        $.ajax({
            method: 'GET',
            url: url,
        }).done(function (result) {
            let promoElement = $('#promocode')
            let totalEl = promoElement.next('li').find('strong')
            let total = `${totalEl.text()}`
            if (result && result.hasOwnProperty('amount')) {
                promoElement.removeClass('d-none').addClass('d-flex')
                promoElement.find('span.text-success').text(`-$${result.amount}`)
                promoElement.find('small').text(promoCode.toUpperCase())
                totalEl.text(`$${total.slice(1) - result.amount}`)
            } else {
                promoElement.removeClass('d-flex').addClass('d-none')
                totalEl.text(`$25`)
                promoInput.addClass('border border-danger')
            }
        })
        setTimeout(function () {
            loader.hide();
        }, 500)

    })


    $('#form').on('submit', event => {
        event.preventDefault()
        console.log(event.target)
        if (!event.target.checkValidity()) {
            console.log(1)
        } else {
            console.log(222)
            $.ajax({
                method: 'POST',
                url: `https://testologia.ru/checkout/`,
                data: {
                    name: $('#name').val(),
                    last_name: $('#last_name').val(),
                    type: $('#type').val(),
                },
            }).done(function (result) {
                console.log(result)
            })
        }
        event.target.classList.add('was-validated')
    })


})()
