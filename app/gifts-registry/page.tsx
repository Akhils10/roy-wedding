import { Gift, Gifts, RegistryHeader } from "@/components/registry";
import styles from "./Page.module.scss";

const gifts: Gift[] = [
	{
		id: 1,
		productUrl:
			"https://www.jumia.com.ng/buchymix-7-cup-food-processor-yam-pounder-vegetable-chopper-700w-345747341.html",
		productImage: "/registry/food-processor.jpg",
		productName: "Buchymix 7-cup Food Processor, Yam Pounder, Vegetable Chopper, 700W",
	},
	{
		id: 2,
		productUrl:
			"https://www.jumia.com.ng/generic-steel-stainless-steel-stock-pot-44062449.html",
		productImage: "/registry/stainless-steel-pot.jpg",
		productName: "Stainless Steel Stock Pot",
	},
    {
		id: 3,
		productUrl:
			"https://www.jumia.com.ng/generic-set-of-24pcs-gold-plated-cutlery-spoon-fork-and-knife-76439255.html",
		productImage: "/registry/gold-plated-cutlery-set.jpg",
		productName: "Gold Plated Cutlery Set",
	},
	{
		id: 4,
		productUrl:
			"https://www.jumia.com.ng/generic-ceramic-coating-granite-pot-24cm-335060997.html",
		productImage: "/registry/ceramic-coating-granite-pot.jpg",
		productName: "Ceramic Coating Granite Pot",
	},
	{
		id: 5,
		productUrl:
			"https://www.konga.com/product/buchymix-premium-stainless-steel-multifunctional-smart-air-fryer-oven-18l-1800w-6498284",
		productImage: "/registry/buchymix-air-fryer.jpg",
		productName: "Buchymix Air Fryer Oven",
	},
	{
		id: 6,
		productUrl:
			"https://www.jumia.com.ng/salter-all-in-one-mini-food-processor-pro-300w-257154178.html",
		productImage: "/registry/salter-food-processor.jpg",
		productName: "Salter All-in-One Mini Food Processor Pro - 300W",
	},
	{
		id: 7,
		productUrl:
			"https://www.jumia.com.ng/generic-double-ply-duvet-bedsheet-with-4-pillow-cases-navy-blueash-211435174.html",
		productImage: "/registry/duvet-set.jpg",
		productName: "Double Ply Duvet, Bedsheet With 4 Pillow Cases-Navy Blue/Ash",
	},
	{
		id: 8,
		productUrl:
			"https://www.jumia.com.ng/generic-transparent-clear-glass-cooking-pot-a-set-of-spatula-286141582.html",
		productImage: "/registry/transparent-pot.jpg",
		productName: "Transparent Clear Glass Cooking Pot + A Set Of Spatula",
	},
	{
		id: 9,
		productUrl:
			"https://www.jumia.com.ng/generic-silver-crest-6.5l-extra-large-capacity-airfryer-white-263820176.html",
		productImage: "/registry/white-airfryer.jpg",
		productName: "Silver Crest 6.5L Extra Large Capacity Airfryer - White",
	},
	{
		id: 10,
		productUrl:
			"https://www.jumia.com.ng/generic-4-holes-non-stick-omelette-masa-cake-bacon-and-burger-pan-115189675.html",
		productImage: "/registry/burger-pan.jpg",
		productName: "4 Holes Non-stick Burger Pan",
	},
	{
		id: 11,
		productUrl:
			"https://www.jumia.com.ng/buchymix-turbocrush-commercial-blender-2l-2200w-bx250-black-301450422.html",
		productImage: "/registry/buchymix-blender.jpg",
		productName: "Buchymix Blender",
	},
	{
		id: 12,
		productUrl:
			"https://www.jumia.com.ng/generic-16pcs-hotel-restaurant-banquet-porcelain-dinner-set-279965863.html",
		productImage: "/registry/dinner-set.jpg",
		productName: "16pcs Banquet Porcelain Dinner Set",
	},
	{
		id: 13,
		productUrl:
			"https://www.jumia.com.ng/generic-classy-home-decor-desktop-reading-floor-lamp-heavy-duty-base-82043365.html",
		productImage: "/registry/floor-lamp.jpg",
		productName: "Desktop Reading Floor Lamp",
	},
	{
		id: 14,
		productUrl:
			"https://www.jumia.com.ng/stanley-40-oz-tumbler-with-handle-and-straw-lid-stainless-steel-342769411.html",
		productImage: "/registry/tumbler-with-straw.jpg",
		productName: "40 Oz Tumbler With Handle And Straw Lid",
	},
	{
		id: 15,
		productUrl:
			"https://www.jumia.com.ng/3-in-1-waffle-sandwich-and-grill-maker-generic-mpg3832055.html",
		productImage: "/registry/waffle-maker.jpg",
		productName: "3 In 1 Waffle-Sandwich And Grill Maker",
	},
	{
		id: 16,
		productUrl:
			"https://www.jumia.com.ng/sq-professional-marble-die-cast-aluminium-stockpot-set-285541594.html",
		productImage: "/registry/aluminium-pot-set.jpg",
		productName: "Aluminium Stockpot Set",
	}
];

export default function Registry() {

	return (
		<div data-animation="layout" style={{ position: "relative" }}>
			<div data-animation="layout-content">
				<div className={styles.container}>
					<RegistryHeader />
					<Gifts gifts={gifts} />
				</div>
			</div>
		</div>
	);
}
