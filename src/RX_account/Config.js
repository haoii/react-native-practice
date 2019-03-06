

const host_url = 'http://10.0.2.2:8000/';  //'http://47.100.252.211:80/';  //'http://10.0.2.2:8000/';
const account_url = host_url + 'account/';
const static_url = host_url + 'static/';
const customers_url = account_url + 'customers/';
const suppliers_url = account_url + 'suppliers/';
const submit_add_customer_url = account_url + 'add_customer/';
const submit_add_supplier_url = account_url + 'add_supplier/';
const submit_collect_from_customer_url = account_url + 'collect_from_customer/';
const collections_from_customer_url = account_url + 'collections_from_customer/';

export default URL = {
  customers: customers_url,
  suppliers: suppliers_url,
  submit_add_customer: submit_add_customer_url,
  submit_add_supplier: submit_add_supplier_url,
  submit_collect_from_customer: submit_collect_from_customer_url,
  collections_from_customer: collections_from_customer_url,
};


