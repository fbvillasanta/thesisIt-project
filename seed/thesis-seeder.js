var Thesis = require('../models/thesis');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var uri = "mongodb://root:password@ds131119.mlab.com:31119/coen3463-m4t5";
mongoose.connect(uri);

//mongoose.connect('localhost:27017/thesisIt');
var theses = [
    new Thesis({
        thesis: 'Automated Glass Wall Cleaner',
        members: [
            'Melvin Ampit',
            'Analie Moreno',
            'Jan Socorro Policarpio',
            'Alfonzo Suarez'
        ],
        advisers: [
            'Dr. Remedios Ado',
            'Engr. Julian Lorico'
        ],

        sentence: 'A glass cleaning device can be used for hassle-free cleaning of surfaces such as walls, floors, and windows with a minimum human involvement.',
        description: 'A glass cleaning device can be used for hassle-free cleaning of surfaces such as walls, floors, and windows with a minimum human involvement.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Automatic Dog Feeder',
        members: [
            'Angela Milallos',
            'Roemar Pajaron',
            'Akira Kim Soriano'
        ],
        advisers: [
            'Dr. Remedios Ado',
            'Engr. Julian Lorico'
        ],
        sentence: 'Automatic Dog feeder that helps your dog get fed on time.',
        description: 'This study is about a wireless mobile application-controlled automatic dog feeder with remote monitoring system that monitors the activity of the pet through a camera connected to a wireless network and built in weighing scale that dispenses the amount of food based on the dog\u2019s weight, activity level and food type.\r\n\r\nThe study aims to feed just the right amount of food and water and cater the needs of the dog while their owners are away.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'Bus Passenger Monitoring and Ticketing System Using RFID',
        members: [
            'Rodemar John Aguilar',
            'Arjay Dala',
            'Peach Dapitan',
            'Arrah Shaine Lumbreras'
        ],
        advisers: [
            'Dr. Remedios Ado',
            'Engr. Julian Lorico'
        ],
        sentence: 'An alternative to the current human ticketing system that uses RFIDs.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'Instagrind',
        subtitle: 'Fresh Ground Coffee from Roasting to Grinding',
        members: [
             'Jobelle San Juan',
             'Diane Christelle Sismundo',
             'Airianee Jasminee Tanyag',
             'Danica-Faye Villanueva'
        ],
        advisers: [
            'Dr. Remedios Ado',
            'Engr. Julian Lorico'
        ],
        sentence: 'A microcontroller-based machine that can roast, cool, and grind green coffee beans',
        description: 'This study was conducted by the proponents to produce an easy and efficient way of processing coffee from roasting to grinding.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'Automated Oil-based, Water-based and Latex Paint Mixer with Color Analyzer',
        members: [
            'Ryan Gabriel Bunquin',
            'Roselyn Cañete',
            'Rose Suzette Lapitan',
            'Michael Villaverde'
        ],
        advisers: [
            'Julius Cansino',
            'Ronald Fernando'
        ],
        sentence: 'Paint mixer machine with color analyzer for mixing oil-based or water-base paint.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'Map-based Restaurant/Food Chains Finder Android Application',
        members:[
            'Cyrille Ablaza',
            'Janine Buarao'
        ],
        advisers:[
            'Engr. Julius Cansino',
            'Engr. Ronald Fernando'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'Hybrid Renewable Energy Powered Lighthouse',
        members: [
            'Zoren Caspe',
            'Keith Lauren Decena',
            'Erick Manantan',
            'John Paolo Samson'
        ],
        advisers: [
            'Engr. Julius Cansino',
            'Engr. Ronald Fernando'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Home Greywater Waste Filtration With Monitoring Using Corn Cob',
        members: [
            'Jay Bagay',
            'Jhoffer Castillo',
            'Charisse Mariel Medina',
            'Rommel Reyes Jr.'
        ],
        advisers:[
            'Engr. Julius Cansino',
            'Engr. Ronald Fernando'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'Mosquito Misting System with Repellent Maker',
        members: [
            'Janea Cris Agupitan',
            'Jess Vincent Redula',
            'Jomelle Taduran',
            'Kimberly Vilajuan'
        ],
        advisers: [
            'Engr. Rolito Mahaguay',
            'Engr. Florinda Oquindo'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),

    new Thesis({
        thesis: 'Free Energy Generator of Neodymium Magnets for Mobile Devices',
        members:[
            'Jervin Carlos',
            'Jarmaine Faye Geda',
            'Drexler Ceasar Jose',
            'Ian Kristopher Santos'
        ],

        advisers: [
            'Engr. Rolito Mahaguay',
            'Engr. Florinda Oquindo'
       ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'The Development of Smart-Interactive Mirror Using Raspberry Pi',
        members: [
           'Alejandro Domantay Jr.',
           'Stan Roe Rosales',
            'Erick John Tapado',
           'Celine Tubianosa'
        ],
        advisers: [
            'Engr. Rolito Mahaguay',
            'Engr. Florinda Oquindo'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'The Movable Rat Trapping and Exterminating System',
        members:[
            'Geneva Cudal',
            'Jeffeson Danilas',
            'Roel Dayor Jr.',
            'Renzel Delos Santos'
        ],
        advisers: [
            'Engr. Rolito Mahaguay',
            'Engr. Florinda Oquindo'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'Culturing Chinese Cabbage Using Dual Layered Hydroponic Grow Box',
        members: [
            'Gail Hammilton Chua',
            'Eichelleen Espiritu',
            'Mark Tan',
            'Jemar Villareal'
        ],
        advisers: [
            'Engr. Rolito Mahaguay',
            'Engr. Florinda Oquindo'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'Solar Powered Potable Water Vending Machine Through Recycled Plastic Bottles',
        members: [
            'Lorence Arago',
            'Jasper John Bautista',
            'Rina Charlene Rubio',
            'Michael Jon Sapalo'
        ],

        advisers: [
            'Engr. Rolito Mahaguay',
            'Engr. Florinda Oquindo'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'Fruit & Vegetable E-Slicer',
        members: [
            'Christian Jay Aligaga',
            'Jason Concepcion',
            'John Benedict Dimalaluan',
            'Rose Fortaliza'
        ],
        advisers: [
            'Engr. Rolito Mahaguay',
            'Engr. Florinda Oquindo'
        ],
        sentence: 'A machine for automating the process of slicing fruits and vegetables.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'Fish Finder via Android Application',
        members: [
            'John Jay Barcela',
            'Jason Elano',
            'Paul Enriquez',
            'Gadfrey Sumague'
        ],
        advisers:[
            'Engr. Rolito Mahaguay',
            'Engr. Florinda Oquindo'
        ],
        sentence: 'A device that uses the concept of ultrasonic waves for detection.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'Fish Finder via Android Application',
        members: [
             'John Jay Barcela',
             'Jason Elano',
             'Paul Enriquez',
             'Gadfrey Sumague'
        ],
        advisers: [
            'Engr. Rolito Mahaguay',
            'Engr. Florinda Oquindo'
        ],
        sentence: 'A device that uses the concept of ultrasonic waves for detection.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'The Generation of Cathode Utilizing Eggshell in Replacement to Manganese Dioxide in Battery Production',
        members: [
            'Johnuel Espiritu',
            'Aira Ramel',
            'April Rose Rosauro',
            'Danica Rose Santos'
        ],
        advisers: [
            'Engr. Rolito Mahaguay',
            'Engr. Florinda Oquindo'
        ],
        sentence: 'A device that uses the concept of ultrasonic waves for detection.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'A VPN-Based Water Quality Monitoring System for Sea Cucumber',
        members: [
            'Raymond Leabres',
            'Rey-dante Montero',
            'Crescel Charmaine Nudalo',
            'Sharina Mae Prudencio'
        ],
        advisers: [
            'Engr. Pedrito Tenerife Jr.',
            'Engr. Orland Tubola'
        ],
        sentence: 'No description added.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Greywater Filtration System for Household Laundry with Water Quality Monitoring',
        members: [
            'Maricar Bahaya',
            'Dan Andre Camacho',
            'Melvin Rabadon',
            'Joanah Marie Ramos'
        ],
        advisers: [
            'Engr. Pedrito Tenerife Jr.',
            'Engr. Orland Tubola'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Automated Microcontroller-based Dishwasher from PUP Canteen',
        members: [
            'Ariane Aquino',
            'Alexander Casabuena Jr.',
            'Pia Salve Alexis Dayao',
            'Van Erick Mangaoang'
        ],
        advisers: [
            'Engr. Ferdinand Natividad',
            'Dr. Antonio Velasco'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"

    }),
    new Thesis({
        thesis: 'Automated Banana Wine Maker',
        members: [
             'Redick Butay',
             'Jon Rae Dampil',
             'Justine Philip Ferrer',
             'Kim Hubert Rosales'
        ],
        advisers: [
            'Engr. Ferdinand Natividad',
            'Dr. Antonio Velasco'
        ],
        sentence: 'A machine that uses ripe bananas and turns it into wine juice for further fermentation.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Air Quality Manager for Public Bathroom Controllable via Microcontroller-based Remote Control',
        members: [
            'John Israel Aquino',
            'Lerry Joy Cabanding',
            'Keene Clavecilla',
            'Hobie Manvel Gamponia'
        ],
        advisers:[
            'Engr. Ferdinand Natividad',
            'Dr. Antonio Velasco'
        ],
        sentence: 'A machine that uses ripe bananas and turns it into wine juice for further fermentation.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Automated Surface Irrigation Control System',
        members: [
            'Mary Joyce Cruzado',
            'Aira May Cueto',
            'Jan Errand Del Rosario',
            'Darlyn Marcelo'
        ],
        advisers: [
            'Engr. Ferdinand Natividad',
            'Dr. Antonio Velasco'
        ],
        sentence: 'A machine that uses ripe bananas and turns it into wine juice for further fermentation.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Smartphone Message Converter to Braille Display with Voice Synthesizer',
        members: [
            'Geane Marie Karla Figueroa',
            'Maverick Linget',
            'Marie Carissa Mantala',
            'Jennifer Tolentino'
        ],
        advisers:[
            'Engr. Ferdinand Natividad',
            'Dr. Antonio Velasco'
        ],
        sentence: 'A machine that uses ripe bananas and turns it into wine juice for further fermentation.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Automated Sandwich Maker with Android Application',
        members:[
            'Mithi Luwalhati Chavez',
            'Nilven Bryan Corona',
            'Arrel Poblete',
            'Louren Mae Tarnate'
        ],
        advisers: [
           'Engr. Ferdinand Natividad',
            'Dr. Antonio Velasco'
        ],
        sentence: 'A machine controlled by an Android application for automating the process of sandwich making.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Sign Language',
        subtitle: "A Non-Signer's Guide Through Hand Movement Analysis and Face Recognition",
        members: [
            'Anthony Louise Balon',
            'Carl Cortina',
            'Neriel Mallari',
            'Jervin Mandapat'
        ],
        advisers: [
            'Engr. Ferdinand Natividad',
            'Dr. Antonio Velasco'
        ],
        sentence: 'A machine controlled by an Android application for automating the process of sandwich making.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'MCU based Soil Monitoring System',
        members: [
            'Adler Ken Bulado',
            'Royce Ivan Fadriquela',
            'Giancarlo Javier',
            'Charles Marco Salen'
        ],
        advisers: [
            'Engr. Rolito Mahaguay',
            'Dr. Antonio Velasco'
        ],
        sentence: 'A machine controlled by an Android application for automating the process of sandwich making.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Automated Brick Maker from PET Bottles and Coconut Husks',
        members: [
            'Juan Paulo Escario',
            'Hannah Lae Francisco',
            'Jake Lester Gatchalian',
            'Karen Ann Lameseria'
        ],
        advisers: [
            'Engr. Rolito Mahaguay',
            'Dr. Antonio Velasco'
        ],
        sentence: 'A machine that can densify PET bottles and compact coconut husks into bricks.',
        description: 'PET bottles and Coconut husks are one of the materials here in the Philippines that are considered as causes of pollution. The researchers decided to create an automated machine that can densify the plastic bottles and make it into a bricks. Another is an automated machine that can compact coconut husks and formed into a brick which can be used in planting purposes.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Automated Adhesive Maker using Pine Tree Sap',
        members: [
            'Rowan Camagay',
            'Ralph Paolo Gabatino',
            'Louise Nuñez',
            'Cesar Allen Suba'
        ],
        advisers: [
            'Engr. Ferdinand Natividad',
            'Dr. Antonio Velasco'
        ],
        sentence: 'No description added.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Piso Votes Machine',
        subtitle: 'Coin Counting and Coin Sorting Machine with Database Powered by Cloud Technology',
        members: [
            'Jose Renzo Bainco',
            'Bea Aira Lee Corpuz',
            'Angela Rose Diwa',
            'Romar San Juan'
        ],
        advisers: [
            'Dr. Remedios Ado',
            'Engr. Julian Lorico'
        ],
        sentence: 'A machine inspired by the piso vote system of ACCESS with a database powered by Cloud technology.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'MCU-Based Steam Irone',
        members: [
            'Rish Joy Del Rosario',
            'Serjay Ilaga',
            'Tello Tamayo',
            'Jocelle Tanqui-on'
        ],
        advisers: [
            'Dr. Remedios Ado',
            'Engr. Julian Lorico'
        ],
        sentence: 'A machine that will automatically iron the cloth through the use of steam.',
        description: 'With this machine, the user will first select the type of fabric they will iron. Each fabric has a pre-set value for the number of rounds and the temperature.\r\n\r\nIf at the end the user is not satisfied. they will be asked to input additional number of rounds \r\n\r\nThe machine is also energy-efficient as it has a heat retention, meaning once heated up it will turn off the heater and will only turn on again if the heat is too low.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'SeaLaw',
        subtitle: 'A Hybrid Renewable Energy-Powered Light Buoy System Harnessing Sea Energy Potentials',
        members: [
            'Christopher Renz Arnau',
            'Jann Warren Aralar',
            'John Angelo Mariano',
            'Ian Kenneth Poblete'
        ],
        advisers: [
           'Engr. Pedrito Tenerife Jr.',
           'Engr. Orland Tubola'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'The Development of Low-Cost Lidar System Utilizing Quadcopter as UAV (Unmanned Aerial Vehicle) for 3D Building Model Reconstruction',
        members: [
            'Wency Burlat',
            'Dan Jewelle Sanchez',
            'Jelony Sobremisana',
            'Jan Carlo Urminita'
        ],
        advisers: [
            'Engr. Pedrito Tenerife Jr.',
            'Engr. Orland Tubola'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Kerosene Production Machine Utilizing Dalandan Peels',
        members: [
            'Reina Bianca Gile',
           'Joselito Gipit',
            'John Sherwin Rulete',
            'Sharmaine Saga'
        ],
        advisers:[
            'Engr. Pedrito Tenerife Jr.',
            ''
        ],
        sentence: 'Automated system for extracting limonene from dalandan peels through steam distillation process.',
        description: 'An automated and user-friendly steam distillation machine which helps people make their own alternative kerosene fuel from dalandan peels.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Fish Cages Lighting System at Cariaz Island Alaminos Pangasinan Utilizing Hybrid Renewable Resources',
        members: [
            'Lawrence Ignacio',
            'Karen Landoy',
            'Dave Allen Motea',
           'Argene Rafael'
        ],
        advisers: [
            'Engr. Pedrito Tenerife Jr.',
            'Engr. Orland Tubola'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Intelligent Wireless Greenhouse Climate Management System for Strawberry Production',
        members: [
            'Patric Ian Esposo',
            'Alvin Lipata',
            'Jerico Sangrador',
            'Jayrald Teberio'
        ],
        advisers:[
            'Engr. Pedrito Tenerife Jr.',
            'Engr. Orland Tubola'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Construction and Implementation of Hybrid Renewable Energy Source',
        members: [
            'Reden Batusbatusan',
            'Melchor Bureros',
            'Edward Joseph Macailao'
        ],
        advisers: [
            'Engr. Pedrito Tenerife Jr.',
            'Engr. Orland Tubola'
        ],
        sentence: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Automatic Banana Peel Patty Maker',
        members: [
            'Darwin Arandilla',
            'Allison Dwight Malto',
            'Johnston Perocho'
        ],
        advisers: [
           'Engr. Julius Cansino',
           'Engr. Ronald Fernando'
        ],
        sentence: 'A machine that automates burger patty making using banana peels.',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Automated Longganisa Maker',
        members: [
            'Niña Geralyn Palambiano',
            'Mary Andrea Ricafrente',
            'Paul Aldrin Roque',
            'Jefferson Tonic'
        ],
        advisers: [
            'Engr. Julius Cansino',
            'Engr. Ronald Fernando'
        ],
        sentence: 'A machine that automates the process of making longganisa (spanish sausage).',
        description: 'Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Autonomous Disaster Risk Response Drone built on top of Aksyon Sentral Platform',
        members: [
            'Shella May Cantos',
            'Francisc Jerhone Camillo',
            'William Caballero Jr.',
            'Christian Ashley Mones'
        ],
        advisers: [
            'Engr. Julius Cansino',
            'Engr. Ronald Fernando'
        ],
        sentence: 'The Autonomous Disaster Risk Response Drone shall be the new frontier in helping disaster volunteers in their endeavor of saving lives through the use of new technologies.',
        description: "The Autonomous Disaster Risk Response Drone, act as the Advance Data Gatherer for Disaster Volunteers. The drone works in three modes. First mode will be the Reconnaissance Mode. The drone will be sent to the location opted by the Disaster Volunteers and gather Thermal Data. This data will be sent to the centralized Disaster Information System of Pasig called Aksyon Sentral. This allows all volunteers that has access to the system to view what is being sent by the drone and act accordingly. Second mode will be Surveillance Mode, after decision making, the drone will act as the main center's eyes as volunteers traverse the dangerous fields. Making sure that the volunteers lives are not in harm. The last mode will be the last sweep mode. The last sweep mode, ensures that none is left and all things are taken care of.",
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Water Quality Parameter Monitoring and Maintenance System for Extensive Tilapia Culture in the BFAR-NFFTC',
        members: [
            'Jonel De Guzman',
            'Roland Rei Espeleta',
            'Micah Erika Laroza',
            'John Ronald Magahis'
        ],
        advisers: [
            'Engr. Pedrito Tenerife Jr.',
            'Engr. Orland Tubola'
        ],

        sentence: 'A system that measures the important water quality parameters for survival of tilapia which is done manually by different methods.',
        description: "Esse quo est quis mollitia ratione magni assumenda repellat atque modi temporibus tempore ex. Dolore facilis ex sunt ea praesentium expedita numquam?\r\n\r\nQuos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci rem dolorem nesciunt perferendis quae amet deserunt eum labore quidem minima.",
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Automated Bioethanol Fermentor from Pineapple (Ananas Comosus) Peelings with Temperature and Power of Hydrogen (pH) level indicator',
        members: [
            'Justin Christopher Estorga',
            'Ivy Marie Porras',
            'Shanilyn Louise Santiago',
            'Lleur Tan'
        ],
        advisers: [
             'Engr. Julius Cansino',
             'Engr. Ronald Fernando'
        ],
        sentence: 'The Automated Bioethanol Fermentor from Pineapple Peel Extract with Monitoring System is a electrostatically accelerated fermentor prior to the manual process of extracting the fermentable sugars of pineapple peelings to produce bioethanol.',
        description: "One of the main problems concerning our environment is the continuous burning of fossil fuels. This led the proponents to know that there are wastes, especially from food, that can be used as an alternative to fuel. Bioethanol is a fuel that can be produced by fermenting fruits or plants containing sugar and starch. The machine called Automated Bioethanol Fermentor from Pineapple Peel Extract with Monitoring System is an answer to one of the problems the world is currently facing.\r\n\r\nThis automated system in fermenting bioethanol utilizes electrostatic fermentation to achieve lesser fermentation time and higher ethanol yield percentage. The system was indeed effective compared to the manual way of fermenting bioethanol. Also, with the use of electrostatic fermentation, the system is able to enhance the process in terms of speed and quality.",
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Real-time Seawater Quality Monitoring System Pangasinan Eco-marine Developmental System',
        members: [
            'Claudine Abuloc',
            'Keith Laurence Canaya',
            'John Paul Dacula',
            'Amar Jayson Membrere'
        ],
        advisers: [
            'Engr. Pedrito Tenerife Jr.',
            'Engr. Orland Tubola'
        ],
        sentence: 'No description added.',
        description: "Real-time Seawater Quality Monitoring System Pangasinan Eco-marine Developmental System is a system created to measure the acidity, turbidity, salinity, conductivity, temperature and Dissolved oxygen present in the seawater of Carias Island, Alaminos, Pangasinan.",
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Automated Grinder, Boiler and Strainer for Soymilk and Silken Tofu Maker',
        members: [
            'Jayvee Asuncion',
            'Romina Shaye Bañadera ',
            'Warren Mae Bernabe',
            'Sheila Victoria Siongco'
        ],
        advisers: [
            'Dr. Remedios Ado',
            'Engr. Julian Lorico'
        ],
        sentence: 'A machine that automates the creation of soya milk and tofu from soybeans.',
        description: "Silken tofu is made from a soy milk which comes from soybeans activated by an agent or a coagulant. Making silken tofu at home from scratch is time-consuming especially with processes that involved a lot of steps and a fairly elaborate set-up somewhat like to cheese making. Most of the work involved in making silken tofu and soymilk requires different kinds of devices in grinding, boiling and straining. In order to accommodate these devices, a large amount of space is needed for the working process.",
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'Automated Gluten-Free Banana Flour Maker',
        subtitle: 'Food',
        members: [
            'John Elijah De Asis',
            'Neryl Anne Empenio',
            'Pierangelo Martin',
            'Francesca Villasanta'
        ],
        advisers: [
            'Dr. Remedios Ado',
            'Engr. Julian Lorico'
        ],
        sentence: 'A machine that slices peeled bananas, dries them, and then mills them afterwards.',
        description: 'Banana flour is generally produced with green bananas that are peeled, chopped, dried, and then ground. This process can be completed traditionally by hand where the bananas are sun dried, dried in an oven, or a residential food dryer and then either ground in a mortar and pestle or with a mechanical grinder. So the researchers have decided to build a machine which enables users to do it automatically. The machine will slice the banana plantain into smaller pieces, in order to be dehydrated easily, and be dehydrated for few moment instead of waiting one whole day to be sun-dried, and as it was already dehydrated, the banana plantains would be pounded and be grinded to form into powder-like, and will be serve as a replacement for whole wheat flour which is not gluten free and much healthier than the whole wheat flour.',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),
    new Thesis({
        thesis: 'EyeBerryPi',
        subtitle: 'Gate Security with Implementation of Neural Network for Deep Learning Facial Recognition',
        members: [
            'Martin John Lopez',
            'Emmanuel Nipal Jr.',
            'Dave Robert Torrente',
            'Jovani Warguez'
        ],
        advisers: [
            'Dr. Remedios Ado',
            'Engr. Julian Lorico'
        ],
        sentence: 'A Security system that uses neural network for deep learning facial recognition to scan faces',
        description: 'To give security to a specific area by providing a Face Recognition System implemented using neural network',
        image: "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg"
    }),

];
var done = 0;
for (var i = 0; i < theses.length; i++) {
    theses[i].save(function(err, result) {
        done++
        if (done === theses.length) {
            exit();
        }
    });
}
function exit() {
    mongoose.disconnect();
}