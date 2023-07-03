import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
	try {
		await prisma.transaction.deleteMany();
		await prisma.review.deleteMany();
		await prisma.variant.deleteMany();
		await prisma.product.deleteMany();
		await prisma.seller.deleteMany();
		await prisma.customer.deleteMany();
		await prisma.order.deleteMany();
		await prisma.paymentMethod.deleteMany();
		await prisma.discount.deleteMany();
		await prisma.cartItem.deleteMany();
		await prisma.employee.deleteMany();
		await prisma.role.deleteMany();
		await prisma.organization.deleteMany();

		// Create organization
		const organization = await prisma.organization.create({
			data: {
				name: 'Dummy Organization',
				webstoreUrl: 'https://dummyorganization.com',
				contactInfo: {
					phone: faker.phone.number()
				}
			}
		});

		// Create sellers
		const seller1 = await prisma.seller.create({
			data: {
				organizationId: organization.id,
				name: 'Dummy Seller 1',
				subdomain: 'seller1',
				isOnline: true,
				enableWebStore: true,
				contactInfo: {
					email: faker.internet.email()
				}
			}
		});

		const seller2 = await prisma.seller.create({
			data: {
				organizationId: organization.id,
				name: 'Dummy Seller 2',
				subdomain: 'seller2',
				isOnline: true,
				enableWebStore: true,
				contactInfo: {
					email: faker.internet.email()
				}
			}
		});

		// Create customers
		const customer1 = await prisma.customer.create({
			data: {
				organizationId: organization.id,
				fname: faker.person.firstName(),
				lname: faker.person.lastName(),
				email: faker.internet.email(),
				passwordHash: await bcrypt.hash('password789', 10),
				authToken: 'authToken789',
				phoneNumber: '+15555555555',
				addresses: [
					{
						unit: 'Apt 401',
						street: 'Customer 1 Street',
						city: 'Dummyville',
						state: 'Dummy State',
						country: 'Dummy Country',
						postalCode: '45678'
					}
				]
			}
		});

		const customer2 = await prisma.customer.create({
			data: {
				organizationId: organization.id,
				fname: faker.person.firstName(),
				lname: faker.person.lastName(),
				email: faker.internet.email(),
				passwordHash: await bcrypt.hash('password012', 10),
				authToken: 'authToken012',
				phoneNumber: '+17777777777',
				addresses: [
					{
						unit: 'Apt 501',
						street: 'Customer 2 Street',
						city: 'Dummyville',
						state: 'Dummy State',
						country: 'Dummy Country',
						postalCode: '56789'
					}
				]
			}
		});

		// Create products
		const product1 = await prisma.product.create({
			data: {
				sku: 'SKU001',
				upc: 'UPC001',
				title: 'Dummy Product 1',
				description: 'This is a dummy product 1',
				brandName: 'Dummy Brand',
				modelName: 'Model 1',
				category: 'Electronics',
				thumbnail: {
					type: 'image/jpeg',
					src: 'https://dummyproduct1.com/thumbnail.jpg',
					width: '100',
					height: '100'
				}
			}
		});

		const product2 = await prisma.product.create({
			data: {
				sku: 'SKU002',
				upc: 'UPC002',
				title: 'Dummy Product 2',
				description: 'This is a dummy product 2',
				brandName: 'Dummy Brand',
				modelName: 'Model 2',
				category: 'Electronics',
				thumbnail: {
					type: 'image/jpeg',
					src: 'https://dummyproduct2.com/thumbnail.jpg',
					width: '100',
					height: '100'
				}
			}
		});

		// Create variants
		const variant1 = await prisma.variant.create({
			data: {
				productId: product1.id,
				sellerId: seller1.id,
				condition: 'new',
				attributes: [
					{ name: 'Color', value: 'Red', group: 'General' },
					{ name: 'Size', value: 'Small', group: 'General' }
				],
				price: 99.99,
				stock: 10
			}
		});

		const variant2 = await prisma.variant.create({
			data: {
				productId: product1.id,
				sellerId: seller2.id,
				condition: 'new',
				attributes: [
					{ name: 'Color', value: 'Blue', group: 'General' },
					{ name: 'Size', value: 'Large', group: 'General' }
				],
				price: 89.99,
				stock: 5
			}
		});

		const variant3 = await prisma.variant.create({
			data: {
				productId: product2.id,
				sellerId: seller1.id,
				condition: 'new',
				attributes: [
					{ name: 'Color', value: 'Black', group: 'General' },
					{ name: 'Size', value: 'Medium', group: 'General' }
				],
				price: 79.99,
				stock: 8
			}
		});

		const variant4 = await prisma.variant.create({
			data: {
				productId: product2.id,
				sellerId: seller2.id,
				condition: 'new',
				attributes: [
					{ name: 'Color', value: 'Green', group: 'General' },
					{ name: 'Size', value: 'Extra Large', group: 'General' }
				],
				price: 69.99,
				stock: 3
			}
		});

		console.log('Data seeded successfully!');
	} catch (error) {
		console.error('Error seeding data:', error);
	} finally {
		await prisma.$disconnect();
	}
}

seed();
