

const host_url = 'http://10.0.2.2:8000/';
const account_url = host_url + 'account/';
const static_url = host_url + 'static/';
const customers_url = account_url + 'customers/';
const submit_add_customer_url = account_url + 'add_customer/';

export default URL = {
  customers: customers_url,
  submit_add_customer: submit_add_customer_url,
};


