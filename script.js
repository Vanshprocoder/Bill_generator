var itemCount = 0; // Initialize item count
var totalAmountBeforeTax = 0; // Initialize total amount before tax

function numberToWords(num) {
    const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const thousand = ['thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion'];

    if (num === 0) return 'zero';

    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + ' ' + ones[num % 10];
    if (num < 1000) return ones[Math.floor(num / 100)] + ' hundred ' + numberToWords(num % 100);

    for (let i = 0; i < thousand.length; i++) {
        let unit = 1000 ** (i + 1);
        if (num < unit * 1000) {
            return numberToWords(Math.floor(num / unit)) + ' ' + thousand[i] + ' ' + numberToWords(num % unit);
        }
    }

    return num;
}

function convertTotalAmountToWords() {
    var totalAmountAfterTax = parseFloat(document.getElementById("totalAmountAfterTax").textContent);
    var words = numberToWords(Math.floor(totalAmountAfterTax));
    document.getElementById("invoiceTotalInWords").innerHTML = words.charAt(0).toUpperCase() + words.slice(1) + " only";
}

function addItem() {
    itemCount++; // Increment item count for each new item
    var currentDate = new Date().toLocaleDateString();
    var customer_name = document.getElementById("customer_name").value;
    var address = document.getElementById("address").value;
    var gstin = document.getElementById("gstin").value;
    var state = document.getElementById("state").value;
    var itemName = document.getElementById("itemName").value;
    var hsn = document.getElementById("hsn").value;
    var uom = document.getElementById("uom").value;
    var qty = parseInt(document.getElementById("qty").value, 10);
    var rate = parseFloat(document.getElementById("rate").value);
    document.getElementById('invoiceDate').innerHTML = currentDate;

    var amount = (qty * rate).toFixed(2); // Calculate amount
    totalAmountBeforeTax += parseFloat(amount); // Update total amount before tax

    var newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${itemCount}</td>
        <td>${itemName}</td>
        <td>${hsn}</td>
        <td>${uom}</td>
        <td>${qty}</td>
        <td>${rate.toFixed(2)}</td>
        <td>${amount}</td>
    `;

    document.getElementById("itemDetails").appendChild(newRow);

    document.getElementById("billed_to").innerHTML = customer_name;
    document.getElementById("delivered_to").innerHTML = customer_name;
    document.getElementById("b_address").innerHTML = address;
    document.getElementById("d_address").innerHTML = address;
    document.getElementById("b_state").innerHTML = state;
    document.getElementById("d_state").innerHTML = state;
    document.getElementById("b_gstin").innerHTML = gstin;
    document.getElementById("d_gstin").innerHTML = gstin;

    // Calculate taxes and total after tax
    var cgst = (totalAmountBeforeTax * 0.09).toFixed(2);
    var sgst = (totalAmountBeforeTax * 0.09).toFixed(2);
    var igst = (totalAmountBeforeTax * 0.09).toFixed(2);
    var totalTaxAmount = (parseFloat(cgst) + parseFloat(sgst) + parseFloat(igst)).toFixed(2);
    var totalAmountAfterTax = (totalAmountBeforeTax + parseFloat(totalTaxAmount)).toFixed(2);

    // Update DOM elements with calculated tax and total values
    document.getElementById("totalAmountBeforeTax").innerHTML = totalAmountBeforeTax.toFixed(2);
    document.getElementById("cgstAmount").innerHTML = cgst;
    document.getElementById("sgstAmount").innerHTML = sgst;
    document.getElementById("igstAmount").innerHTML = igst;
    document.getElementById("totalTaxAmount").innerHTML = totalTaxAmount;
    document.getElementById("totalAmountAfterTax").innerHTML = totalAmountAfterTax;

    // Convert total amount after tax to words and update the DOM
    convertTotalAmountToWords();
}

function printInvoice() {
    window.print();
}
