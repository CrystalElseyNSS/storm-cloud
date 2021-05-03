import * as THREE from './node_modules/three/build/three.module.js'

let scene, camera, renderer, composer
let cloudParticles = []

function init() {
    /* create a universe for your objects, camera, light */
    scene = new THREE.Scene() 
    
    /* create a camera & position it to capture the scene */
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 ) 
    camera.position.z = 1
    camera.rotation.set(1.16, -0.12, 0.27)
    
    /* and the dev said, 'let there be ambient light' */
    let ambient = new THREE.AmbientLight(0x555555)
    scene.add(ambient)

    /* add directional light */
    let directionalLight = new THREE.DirectionalLight(0xff8c19)
    directionalLight.position.set(0,0, 1)
    scene.add(directionalLight)

    /* add point lighting to create aurora lighting effect */
    let orangeLight = new THREE.PointLight(0xf17e0b, 50, 450, 1.7)
    orangeLight.position.set(200, 300, 100)
    let redLight = new THREE.PointLight(0x801436, 50, 450, 1.7)
    redLight.position.set(100, 300, 100)
    let blueLight = new THREE.PointLight(0x175ab1, 50, 450, 1.7)
    blueLight.position.set(300, 300, 200)
    scene.add(orangeLight)
    scene.add(redLight)
    scene.add(blueLight)
    
    /* build the engine */
    renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight )
    
    /* add fog for aurora effect */
    scene.fog = new THREE.FogExp2(0xe3e3e3, 0.001)
    renderer.setClearColor(scene.fog.color)
    
    /* add scene to the page as a canvas element */
    document.body.appendChild( renderer.domElement )

    /* create plane geometry for cloud */
    const cloudGeometry = new THREE.PlaneGeometry(500, 500)

    /* load image to serve as texture for material */
    const cloudTexture = new THREE.TextureLoader().load('smoke.png')

    /* map over loaded texture to create material */
    const cloudMaterial = new THREE.MeshLambertMaterial({ map: cloudTexture, transparent: true, opacity: 0.55 })
    
    /* set animation loop */
    for ( let p = 0; p < 50; p++ ) {
        let cloud = new THREE.Mesh( cloudGeometry, cloudMaterial)
        cloud.position.set( 
            Math.random() * 800 - 400,
            500,
            Math.random() * 500 - 500
        )
        cloud.rotation.set( 
            1.16,
            -0.12,
            Math.random() * 2 * Math.PI
        )
        cloudParticles.push(cloud)
        scene.add(cloud)
    }

    
    

    /* start the engine */
    render() 
}

// set up render loop 
function render() {
    cloudParticles.forEach(p => {
        p.rotation.z -=0.001
    })
    renderer.render( scene, camera )
    requestAnimationFrame( render )
}

init()