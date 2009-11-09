// $Id: uc_conditional_payment.js,v 1.1 2009/10/06 12:09:30 longwave Exp $

$(function() {
  getPaymentOptions();
  $("select[name*=delivery_country], "
    + "select[name*=delivery_zone], "
    + "input[name*=delivery_postal_code], "
    + "select[name*=billing_country], "
    + "select[name*=billing_zone], "
    + "input[name*=billing_postal_code]").change(getPaymentOptions);
  $("input[name*=copy_address]").click(getPaymentOptions);
});

function getPaymentOptions() {
  var order = serializeOrder();
  var payment_method = $('#payment-pane input:checked').val();

  if (!!order) {
    $.ajax({
      type: "POST",
      url: Drupal.settings.basePath + 'cart/checkout/payment_methods',
      data: {
        order: order,
        payment_method: payment_method
      },
      dataType: "html",
      success: function(data) {
        $('#payment-pane .form-radios').empty().append($(data).find('#payment-pane .form-radios'));

        // uc_pma support.
        if (update_method_line_item) {
          $("input:radio[@name='panes[payment][payment_method]']").click(function() {
            update_method_line_item(this.value);
          });
        }

        if (payment_method != $('#payment-pane input:checked').val()) {
          $('#payment-pane input:checked').click();
        }
      }
    });
  }
}
