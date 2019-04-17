var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
//    entry: Build의 대상이 될 파일
    entry: ['./src/index.js'],
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.css$/,
            //use는 여러 로더를 지정할때 사용
            use:['style-loader','css-loader']
        },
        // {
        //     test: /\.(png|svg|jpe?g|gif)$/,
        //     //loader는 단일 로더를 지정할때 사용
        //     loader: 'file-loader',
        //     //option을 통해 각각의 특성에 따라 옵션을 지정
        //     options:{
        //         name: 'static/media/[name].[hash:8].[ext]',
        //     }
        //     //
        // }
        {
            //url-loader : web에서 리소스를 가장 많이 잡아먹는 것 중 하나가 이미지파일
            //이 이미지파일을 효율적으로 관리 할 수 잇는 방법 중 하나
            //이미지를 축소하고 최적화 하는 로더이며, 특정 파일을 base64로 인코딩된 url로 로드해주는 역할
            //file-loader와 다른점은 option에 limit을 주는 것이고 10000은 10kB미만은 url-loader로 처리하는 옵션이고,
            //10KB이상은 file-loader로 처리된다.
            test: /\.(png|svg|jpe?g|gif)$/,
            loader: 'url-loader',
            options:{
                limit:10000,
                name:'static/media/[name].[hash:8].[ext]',
            }
        }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },

    // output: Build 결과를 저장할 경로
    output:{
        path: path.resolve(__dirname,'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    //Webpac-dev-server를 사용하는 이유
    //1. 서버 실행 시 소스 파일들을 번들링하여 메모리에 저장
    //2. 소스파일을 감시하고 있다가 소스파일이 변경되면 변경된 모둘만 새로 번들링
    //3. 변경된 모듈 정보를 브라우저에 전성
    //4. 브라우저는 변경을 인지하고 새로고침 되어 변경사항이 반영된 페이지를 로드
    devServer:{
        host: 'localhost',        //사용될 호스트 지정(주소지정)
        contentBase: './public',//콘텐츠를 제공할경로지정(정적파일을 제공하려는 경우에 제공)
        compress: true,//모든 항목에 대해 gzip압축 사용
        // hot: true,//webpack의 HMR기능 활성화
        inline: true,//inline모드 활성화
        port: 2222,//접속포트설정
        open: true,//dev Server 구동 후 브라우저 열기
        stats:{
            asssets: false,
            colors: true,
            version: false,
            timings: false,
            chunks: false,
            chunkModules: false,
        }
    },
    plugins:[
        //모듈의 이름을 변경하거나 새로운것을 추가하는경우
        //생선된 bundle은 build에서 이름이 변경되지만
        //index.html에 script는 여전히 이전의 이름(변경되기 전 이름)을 참조
        //그래서 이러한 새로운 것이 추가되어 변경된 bundle 이름을
        //수동적으로 index.html에서 변경하는 번거로움을 해결하기위해
        //HtmlWebpackPlugin을 사용한다.
        new HtmlWebpackPlugin({
            favicon: './public/favicon.ico',
            template: './public/index.html'
        }),
        //단순히 webpack으로만 번들링된 것과
        //uglify작업을 진행한 번들을 비교하면
        //uglify작업한 번들의 용량이 훨씬 더 작기때문에
        //나중에 axios, lodash, bootstrap 같은 모듈을
        //추가하면 기본 1MB를 넘어가므로 용량을 줄이기 위해
        //UglifyJsPlugin을 사용함
        new UglifyJSPlugin()
    ]
// babel configration




    
};