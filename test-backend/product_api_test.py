import unittest
import requests
import json
import time

BASE_URL = 'http://localhost:3000/products'

class TestProductAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Create a test product that will be used across tests"""
        # Wait for server to be ready
        max_retries = 5
        for _ in range(max_retries):
            try:
                response = requests.get(BASE_URL)
                if response.status_code == 200:
                    break
            except requests.exceptions.ConnectionError:
                time.sleep(1)
        else:
            raise Exception("Could not connect to API server")

        cls.test_product = {
            'name': 'Test Product',
            'desc': 'Test Description',
            'price': 100,
            'category_id': 1
        }
        # Create the test product and store its ID
        response = requests.post(BASE_URL, json=cls.test_product)
        cls.created_id = response.json()['id']

    @classmethod
    def tearDownClass(cls):
        """Clean up by deleting the test product"""
        if hasattr(cls, 'created_id'):
            requests.delete(f"{BASE_URL}/{cls.created_id}")

    def test_1_create_product(self):
        """Test product creation"""
        new_product = {
            "name": "New Product",
            "desc": "New Description",
            "price": 200,
            "category_id": 1
        }
        response = requests.post(BASE_URL, json=new_product)
        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertIn('id', data)
        
        # Cleanup
        requests.delete(f"{BASE_URL}/{data['id']}")

    def test_2_get_all_products(self):
        """Test retrieving all products"""
        response = requests.get(BASE_URL)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

    def test_3_get_single_product(self):
        """Test retrieving a single product"""
        response = requests.get(f"{BASE_URL}/{self.__class__.created_id}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['name'], self.test_product['name'])

    def test_4_update_product(self):
        """Test updating a product"""
        updated_data = {'name': 'Updated Name'}
        response = requests.put(
            f"{BASE_URL}/{self.__class__.created_id}",
            json=updated_data
        )
        self.assertEqual(response.status_code, 200)
        
        # Verify update
        updated = requests.get(f"{BASE_URL}/{self.__class__.created_id}").json()
        self.assertEqual(updated['name'], 'Updated Name')

    def test_5_delete_product(self):
        """Test product deletion"""
        # First create a product to delete
        temp_product = {
            'name': 'Temp Product',
            'desc': 'Temp Description',
            'price': 300,
            'category_id': 1
        }
        create_res = requests.post(BASE_URL, json=temp_product)
        temp_id = create_res.json()['id']
        
        # Test deletion
        delete_res = requests.delete(f"{BASE_URL}/{temp_id}")
        self.assertEqual(delete_res.status_code, 200)
        
        # Verify deletion
        get_res = requests.get(f"{BASE_URL}/{temp_id}")
        self.assertEqual(get_res.status_code, 404)

    def test_6_invalid_product(self):
        """Test invalid product requests"""
        # Invalid create
        bad_product = {'name': 'Bad'}
        response = requests.post(BASE_URL, json=bad_product)
        self.assertEqual(response.status_code, 400)  # Sequelize validation error

        # Invalid get
        response = requests.get(f"{BASE_URL}/999999")
        self.assertEqual(response.status_code, 404)

def suite():
    test_suite = unittest.TestSuite()
    test_suite.addTest(TestProductAPI('test_1_create_product'))
    test_suite.addTest(TestProductAPI('test_2_get_all_products'))
    test_suite.addTest(TestProductAPI('test_3_get_single_product'))
    test_suite.addTest(TestProductAPI('test_4_update_product'))
    test_suite.addTest(TestProductAPI('test_5_delete_product'))
    test_suite.addTest(TestProductAPI('test_6_invalid_product'))
    return test_suite

if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    runner.run(suite()) 