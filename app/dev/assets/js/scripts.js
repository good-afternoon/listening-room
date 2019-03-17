// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {

  // renderer ------------------------------
  // サイズを指定
  var width = window.innerWidth;
  var height = window.innerHeight;
  // レンダラーを作成
  var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#room')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x222222);


  // scene ------------------------------
  // シーンを作成
  var scene = new THREE.Scene();


  // axis ------------------------------
  // 座標軸を表示
  //var axis = new THREE.AxisHelper(1000);
  //axis.position.set(0,0,0);
  //scene.add(axis);


  // camera ------------------------------
  // カメラを作成
  var perscamera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  var orthocamera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 10000);
  camera = perscamera;
  //camera.position.set(100, 100, 100);
  camera.position.set(0, 0, 100);
  camera.up.set(0, 1, 0);
  camera.lookAt({ x: 0, y: 0, z: 0 });


  // light ------------------------------
  // 平行光源
  var light1 = new THREE.DirectionalLight(0xffffff);
  light1.position.set(1, 1, 1);
  scene.add(light1);

  var light2 = new THREE.DirectionalLight(0x002288);
  light2.position.set(-1, -1, -1);
  scene.add(light2);

  // 環境光
  var light3 = new THREE.AmbientLight(0x444444);
  scene.add(light3);

  controls = new THREE.OrbitControls(camera);


  // group ------------------------------
  // 平面のグループを作る
  var group = new THREE.Group();
  // グループの位置を指定
  group.position.set(0, 1.2, -16);
  // 3D空間にグループを追加する
  scene.add(group);


  // object ------------------------------
  // 平面オブジェクトのサイズ
  var planeSize = 31;

  // 奥の平面
  var geometry = new THREE.PlaneGeometry(planeSize, planeSize, planeSize);
  var material = new THREE.MeshBasicMaterial({
    color: 0xd2b09d,
    side: THREE.DoubleSide
  });
  var plane = new THREE.Mesh(geometry, material);
  // グループに追加
  group.add(plane);


  // 左側の平面
  var geometryLeft = new THREE.PlaneGeometry(planeSize, planeSize, planeSize);
  var materialLeft = new THREE.MeshBasicMaterial({ color: 0xd6cbc1, side: THREE.DoubleSide });
  var planeLeft = new THREE.Mesh(geometryLeft, materialLeft);
  // 移動
  planeLeft.position.x = -planeSize / 2;
  planeLeft.position.z = planeSize / 2;
  // 90度回転
  planeLeft.rotation.y = Math.PI / 2;
  // グループに追加
  group.add(planeLeft);


  // 右側の平面
  var geometryRight = new THREE.PlaneGeometry(planeSize, planeSize, planeSize);
  var materialRight = new THREE.MeshBasicMaterial({ color: 0xd6cbc1, side: THREE.DoubleSide });
  var planeRight = new THREE.Mesh(geometryRight, materialRight);
  // 移動
  planeRight.position.x = planeSize / 2;
  planeRight.position.z = planeSize / 2;
  // 90度回転
  planeRight.rotation.y = Math.PI / 2;
  // グループに追加
  group.add(planeRight);


  // 上側の平面
  var geometryTop = new THREE.PlaneGeometry(planeSize, planeSize, planeSize);
  var materialTop = new THREE.MeshBasicMaterial({ color: 0xe3ded6, side: THREE.DoubleSide });
  var planeTop = new THREE.Mesh(geometryTop, materialTop);
  // 移動
  planeTop.position.y = planeSize / 2;
  planeTop.position.z = planeSize / 2;
  // 90度回転
  planeTop.rotation.x = Math.PI / 2;
  // グループに追加
  group.add(planeTop);


  // 下側の平面
  var geometryBottom = new THREE.PlaneGeometry(planeSize, planeSize, planeSize);
  var materialBottom = new THREE.MeshBasicMaterial({ color: 0x791e10, side: THREE.DoubleSide });
  var planeBottom = new THREE.Mesh(geometryBottom, materialBottom);
  // 移動
  planeBottom.position.y = -planeSize / 2;
  planeBottom.position.z = planeSize / 2;
  // 回転
  planeBottom.rotation.x = Math.PI / 2;
  // グループに追加
  group.add(planeBottom);


  // 3D object ------------------------------
  // OBJ形式のモデルデータを読み込む

  // obj mtlを読み込んでいる時の処理
  var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      //console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  // obj mtlが読み込めなかったときのエラー処理
  var onError = function (xhr) {    };

  // obj mtlの読み込み
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath('assets/obj/apple/');
  mtlLoader.load('apple.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('assets/obj/apple/');
    objLoader.load('apple.obj', function (object) {
      objmodel = object.clone();
      // 縮尺の初期化
      objmodel.scale.set(5, 5, 5);
      // 角度の初期化
      objmodel.rotation.set(0, 0, 0);
      // 位置の初期化
      objmodel.position.set(0, 0, 0);

      // objをObject3Dで包む
      obj = new THREE.Object3D();
      obj.add(objmodel);
      // sceneに追加
      scene.add(obj);
    }, onProgress, onError);
  });


  // 初回実行
  tick();

  // 毎フレーム時に実行されるループイベント
  function tick() {

    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  }
}
