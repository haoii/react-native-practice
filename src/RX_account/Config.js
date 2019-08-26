
import Dimensions from 'Dimensions';

const host_url = 'http://139.224.10.99:8080/';  //'http://139.224.10.99:80/';  //'http://10.0.2.2:8000/';  //http:192.168.1.102:8000/;
const account_url = host_url + 'account/';
const static_url = host_url + 'static/';
const user_url = host_url + 'user/';
const customers_url = account_url + 'customers/';
const customers_table_by_date_url = account_url + 'customers_table_by_date/';
const suppliers_url = account_url + 'suppliers/';
const submit_add_customer_url = account_url + 'add_customer/';
const submit_add_supplier_url = account_url + 'add_supplier/';
const submit_collect_from_customer_url = account_url + 'collect_from_customer/';
const collections_from_customer_url = account_url + 'collections_from_customer/';
const material_classes_url = account_url + 'material_classes/';
const material_classes_no_empty_url = account_url + 'material_classes_no_empty/';
const add_material_class1_url = account_url + 'add_material_class1/';
const add_material_class2_url = account_url + 'add_material_class2/';
const add_material_class3_url = account_url + 'add_material_class3/';
const delete_material_class1_url = account_url + 'delete_material_class1/';
const delete_material_class2_url = account_url + 'delete_material_class2/';
const delete_material_class3_url = account_url + 'delete_material_class3/';
const materials_url = account_url + 'materials/';
const add_material_url = account_url + 'add_material/';
const supplier_detail_url = account_url + 'supplier_detail/';
const add_material_in_supplier_url = account_url + 'add_material_in_supplier/';
const material_orders_url = account_url + 'material_orders/';
const material_order_by_id_url = account_url + 'material_order_by_id/';
const customer_by_id_url = account_url + 'customer_by_id/';
const froms_by_material_url = account_url + 'froms_by_material/';
const add_material_order_url = account_url + 'add_material_order/';
const warehouses_url = account_url + 'warehouses/';
const warehouse_materials_url = account_url + 'warehouse_materials/';
const delete_customer_url = account_url + 'delete_customer/';
const get_material_order_id_url = account_url + 'get_material_order_id/';
const get_memo_id_url = account_url + 'get_memo_id/';
const get_build_record_id_url = account_url + 'get_build_record_id/';
const user_operations_url = account_url + 'user_operations/';
const add_memo_url = account_url + 'add_memo/';
const add_build_record_url = account_url + 'add_build_record/';
const buil_records_in_customer_url = account_url + 'buil_records_in_customer/';
const collections_from_customer_by_id_url = account_url + 'collections_from_customer_by_id/';
const orders_from_customer_by_id_url = account_url + 'orders_from_customer_by_id/';
const supplier_by_id_url = account_url + 'supplier_by_id/';
const orders_from_supplier_by_id_url = account_url + 'orders_from_supplier_by_id/';

const login_url = user_url + 'login/';
const logout_url = user_url + 'logout/';

const static_dir_url = host_url + 'resource/';

export default URL = {
  customers: customers_url,
  customers_table_by_date: customers_table_by_date_url,
  suppliers: suppliers_url,
  submit_add_customer: submit_add_customer_url,
  submit_add_supplier: submit_add_supplier_url,
  submit_collect_from_customer: submit_collect_from_customer_url,
  collections_from_customer: collections_from_customer_url,
  material_classes: material_classes_url,
  material_classes_no_empty: material_classes_no_empty_url,
  add_material_class1: add_material_class1_url,
  add_material_class2: add_material_class2_url,
  add_material_class3: add_material_class3_url,
  delete_material_class1: delete_material_class1_url,
  delete_material_class2: delete_material_class2_url,
  delete_material_class3: delete_material_class3_url,
  materials: materials_url,
  add_material: add_material_url,
  supplier_detail: supplier_detail_url,
  add_material_in_supplier: add_material_in_supplier_url,
  material_orders: material_orders_url,
  material_order_by_id: material_order_by_id_url,
  customer_by_id: customer_by_id_url,
  froms_by_material: froms_by_material_url,
  add_material_order: add_material_order_url,
  warehouses: warehouses_url,
  warehouse_materials: warehouse_materials_url,
  delete_customer: delete_customer_url,
  get_material_order_id: get_material_order_id_url,
  get_memo_id:get_memo_id_url,
  get_build_record_id:get_build_record_id_url,
  user_operations: user_operations_url,
  add_memo:add_memo_url,
  add_build_record:add_build_record_url,
  buil_records_in_customer:buil_records_in_customer_url,
  collections_from_customer_by_id:collections_from_customer_by_id_url,
  orders_from_customer_by_id:orders_from_customer_by_id_url,
  supplier_by_id:supplier_by_id_url,
  orders_from_supplier_by_id:orders_from_supplier_by_id_url,

  login:login_url,
  logout:logout_url,

  static_dir: static_dir_url,
};

export const EPSILON = 0.000000001;

export const ScreenSize = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};
