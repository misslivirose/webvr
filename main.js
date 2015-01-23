
    var renderer = new THREE.WebGLRenderer();
    var vrrenderer = new THREE.VRRenderer(renderer, vrHMD);


    function vrDeviceCallback(vrdevs) {
    for (var i = 0; i < vrdevs.length; ++i) {
      if (vrdevs[i] instanceof HMDVRDevice) {
        vrHMD = vrdevs[i];
        break;
      }
    }
    for (var i = 0; i < vrdevs.length; ++i) {
      if (vrdevs[i] instanceof PositionSensorVRDevice &&
        vrdevs[i].hardwareUnitId == vrHMD.hardwareUnitId) {
          vrHMDSensor = vrdevs[i];
          break;
        }
      }
      initScene();
      initRenderer();
      render();
    }

    function initScene() {
      camera = new THREE.PerspectiveCamera(60, 1280 / 800, 0.001, 10);
      camera.position.z = 2;
      scene = new THREE.Scene();
      var geometry = new THREE.TorusKnotGeometry(1, 4, 64, 8, 2, 3, 1);
      var material = new THREE.MeshNormalMaterial();
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      scene.add(camera);
    }

    function initRenderer() {
      renderCanvas = document.getElementById("render-canvas");
      renderer = new THREE.WebGLRenderer({
        canvas: renderCanvas,
      });
      renderer.setClearColor(0x555555);
      renderer.setSize(1280, 800, false);
      vrrenderer = new THREE.VRRenderer(renderer, vrHMD);
    }

    function render() {
      requestAnimationFrame(render);
      mesh.rotation.y += 0.01;
      mesh.rotation.x += 0.01;
      var state = vrHMDSensor.getState();
      /** TODO: Identify correct camera orientation
      camera.quaternion.set(state.orientation.x,
        state.orientation.y,
        state.orientation.z,
        state.orientation.w);
      **/
      vrrenderer.render(scene, camera);
    }
