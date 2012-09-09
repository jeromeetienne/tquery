/*
 *              Copyright (c) 2012 - James Hunter
 *
 *  This software is copyrighted by and is the sole property of
 *  James Hunter. All rights, title, ownership, or other interests
 *  in the software remain the property of James Hunter.  This
 *  software may only be used in accordance with the corresponding
 *  license agreement.  Any unauthorized use, duplication, transmission,
 *  distribution, or disclosure of this software is expressly forbidden.
 *
 * A Landscape Grid is a peice of landscape that is loaded in and out
 * as the user moves around the landscape, LOD is also controlled here
 *
 */

LandscapeGridObject.prototype = new BaseObject() ;

/**********************************************
 *
 * Function : LandscapeGridObject Constructor
 *
 * Description :
 *
 **********************************************/

function LandscapeGridObject(RENDERx, LANDSCAPEx, UTILx, tileSize)
{
    /* Engines */
    this.RENDERx = RENDERx ;
    this.LANDSCAPEx = LANDSCAPEx ;
    this.UTILx = UTILx ;
    this.tileSize = tileSize ;

    /* Inits */
    this.position = new THREE.Vector3(0,0,0) ;
    this.meshLoaded = false ;
    this.landscapeSize = 250 ;
    this.landscapeSectionCount = this.landscapeSize / 10 ;

    /* Time */
    this.timeMSElapsed = 0.0 ;

    /* >> Shaders <<*/
    this.landscapeShaderCount = 3 ;

    this.landscapeShaderLoadedCount = 0 ;
    this.landscapeVertexShaderLoaded = false ;
    this.landscapeFragmentShaderLoaded = false ;
    this.landscapeTextureCount = 0 ;
    this.landscapeShadersRealised = false ;

    /* >> JSON Height information << */
    this.landscapeHeightInformationLoaded = false ;
}





/***********************************************************************************************************************
 *                                      >>> LANDSCAPE / SHADER CERATION ROUTINES <<<
 ***********************************************************************************************************************/

/**********************************************
 *
 * Function : Init
 *
 * Description : called when the landscape object is first initialised
 *
 **********************************************/

LandscapeGridObject.prototype.init = function( )
{

    /* Load in shaders */
    this.UTILx.loadAJAXFile('data/shaders/landscape/landscape.vertex',
        this.Bind (function (shaderText, url)
        {
            this.landscapeVertexShaderLoaded = true ;
            this.landscapeVertexShader = shaderText ;

            /* Realise the shaders when they are all loaded */
            this.landscapeShaderLoadedCount++ ;
            if (this.landscapeShaderCount == this.landscapeShaderLoadedCount)
                this.createShaderUniforms() ;

        }),
        function (url)
        {
            alert('Failed to load landscape shader ( "' + url + '" ) - Game cannot be started');
        });

    this.UTILx.loadAJAXFile('data/shaders/landscape/landscape.fragment',
        this.Bind (function (shaderText, url)
        {
            this.landscapeFragmentShaderLoaded = true ;
            this.landscapeFragmentShader = shaderText ;

            /* Realise the shaders when they are all loaded */
            this.landscapeShaderLoadedCount++ ;
            if (this.landscapeShaderCount == this.landscapeShaderLoadedCount)
                this.createShaderUniforms() ;
        }),
        function (url)
        {
            alert('Failed to load landscape shader ( "' + url + '" ) - Game cannot be started');
        });

    this.UTILx.loadAJAXFile("data/landscapes/landplane_" + this.position.x + "_" + this.position.z + '.model',
        this.Bind (function (jsonText, url)
        {
            this.landscapeHeightInformationLoaded = true ;
            this.landscapeHeightJSON = jsonText ;

            /* Realise the shaders when they are all loaded */
            this.landscapeShaderLoadedCount++ ;
            if (this.landscapeShaderCount == this.landscapeShaderLoadedCount)
                this.createShaderUniforms() ;
        }),
        function (url)
        {
            alert('Failed to load landscape height data ( "' + url + '" ) - Game cannot be started');
        });



}

/**********************************************
 *
 * Function : createShaderUniforms
 *
 * Description : Create the uniforms (textures)
 *
 **********************************************/

LandscapeGridObject.prototype.createShaderUniforms = function( )
{
    /* Process the JSON height information here */
    this.jsonHeightInformation = eval('(' + this.landscapeHeightJSON + ')');

    /* Load in textures too */
    this.landscapeCustomShaderUniforms =
    {
        time: { type: "f", value: 1.0 },
        texture_grass: { type: "t", value: 0, texture : THREE.ImageUtils.loadTexture('data/landscapes/grass_texture.png', new THREE.UVMapping(), this.Bind( function()
        {
            this.landscapeTextureCount++ ;
            if (this.landscapeTextureCount == 4)
                this.createShader() ;
        } ) ) } ,
        texture_rock: { type: "t", value: 1, texture: THREE.ImageUtils.loadTexture("data/landscapes/rock_texture.png", new THREE.UVMapping(), this.Bind( function()
        {
            this.landscapeTextureCount++ ;
            if (this.landscapeTextureCount == 4)
                this.createShader() ;
        } ) ) } ,
        texture_dirt: { type: "t", value: 2, texture: THREE.ImageUtils.loadTexture("data/landscapes/dirt_texture.png", new THREE.UVMapping(), this.Bind( function()
        {
            this.landscapeTextureCount++ ;
            if (this.landscapeTextureCount == 4)
                this.createShader() ;
        } ) ) } ,
        texture_splat: { type: "t", value: 3, texture: THREE.ImageUtils.loadTexture("data/landscapesplat/splat_" + this.position.x + "_" + this.position.z + '.texture', new THREE.UVMapping(), this.Bind( function()
        {
            this.landscapeTextureCount++ ;
            if (this.landscapeTextureCount == 4)
                this.createShader() ;
        } ) ) }
    } ;

}

/**********************************************
 *
 * Function : createShader
 *
 * Description : Creates the actual shader after loading
 *
 **********************************************/

LandscapeGridObject.prototype.createShader = function( )
{
    /* Combine my uniforms with any three.js ones */
    this.landscapeShaderUniforms = THREE.UniformsUtils.merge([
        this.landscapeCustomShaderUniforms,
        THREE.ShaderLib["basic"].uniforms
    ]) ;

    /* Mark some texture's as needing updated and repeated */
    this.landscapeShaderUniforms.texture_grass.texture.needsUpdate = true ;
    this.landscapeShaderUniforms.texture_rock.texture.needsUpdate = true ;
    this.landscapeShaderUniforms.texture_dirt.texture.needsUpdate = true ;
    this.landscapeShaderUniforms.texture_splat.texture.needsUpdate = true ;

    this.landscapeShaderUniforms.texture_grass.texture.wrapS = this.landscapeShaderUniforms.texture_grass.texture.wrapT = THREE.RepeatWrapping ;
    this.landscapeShaderUniforms.texture_rock.texture.wrapS = this.landscapeShaderUniforms.texture_rock.texture.wrapT = THREE.RepeatWrapping ;
    this.landscapeShaderUniforms.texture_dirt.texture.wrapS = this.landscapeShaderUniforms.texture_dirt.texture.wrapT = THREE.RepeatWrapping ;
    this.landscapeShaderUniforms.texture_splat.texture.wrapS = this.landscapeShaderUniforms.texture_splat.texture.wrapT = THREE.RepeatWrapping ;

    /* SideNote : We scan each line in the shader, looking for the "//R" symbol before evaling whats on the other
    *             side */

    var vertexShaderArray = this.landscapeVertexShader.split("\n") ;
    var mergedVertexShader = '' ;
    for (var nCounter = 0; nCounter < vertexShaderArray.length; nCounter++)
    {
        if ( vertexShaderArray[nCounter].substr(0,3) == "//R" )
        {
            /* Special code, strip off and eval it */
            var specialCode = vertexShaderArray[nCounter].substr(4, vertexShaderArray[nCounter].length ) ;
            var evaluatedCode = eval (specialCode) ;

            mergedVertexShader += evaluatedCode + "\n";
        }
        else
        {
            mergedVertexShader += vertexShaderArray[nCounter] + "\n";
        }
    }

    var fragmentShaderArray = this.landscapeFragmentShader.split("\n") ;
    var mergedfragmentShader = '' ;
    for (var nCounter = 0; nCounter < fragmentShaderArray.length; nCounter++)
    {
        if ( fragmentShaderArray[nCounter].substr(0,3) == "//R" )
        {
            /* Special code, strip off and eval it */
            var specialCode = fragmentShaderArray[nCounter].substr(4, fragmentShaderArray[nCounter].length ) ;
            var evaluatedCode = eval (specialCode) ;

            mergedfragmentShader += evaluatedCode + "\n";
        }
        else
        {
            mergedfragmentShader += fragmentShaderArray[nCounter] + "\n";
        }
    }

    // create the sphere's material
    this.landscapeShaderMaterial = new THREE.ShaderMaterial(
        {
            uniforms:     	this.landscapeShaderUniforms,
            vertexShader:   mergedVertexShader,
            fragmentShader: mergedfragmentShader,
            fog:            true
        }
    );

    /* Load mesh */
    this.meshObject = this.RENDERx.createPlaneMesh(true, this.Bind( this.loadedLandscapeMesh), this.landscapeShaderMaterial, this.landscapeSize, this.landscapeSize, this.landscapeSectionCount, this.landscapeSectionCount) ;

    this.landscapeShadersRealised = true ;
}



/**********************************************
 *
 * Function : isLoaded
 *
 * Description : Creates the actual shader after loading
 *
 **********************************************/

LandscapeGridObject.prototype.isLoaded = function( )
{
    return (this.landscapeShadersRealised && this.meshLoaded) ;
}



/**********************************************
 *
 * Function : loadedLandscapeMesh
 *
 * Description : Occurs when a mesh is loaded
 *
 **********************************************/

LandscapeGridObject.prototype.loadedLandscapeMesh = function( threeMesh )
{
    /* Some landscape stuff */
    threeMesh.geometry.dynamic = true ;
    threeMesh.receiveShadow = true;
    threeMesh.castShadow = true;

    /* Demo */
    var geo = threeMesh.geometry ;
    var vertices = geo.vertices ;

    /* Transform them via world matrix  */
    for (var vertexCounter = 0; vertexCounter < vertices.length; vertexCounter++)
    {
        var x = vertices[vertexCounter].x + (this.landscapeSize / 2) ;
        var y = vertices[vertexCounter].y ;
        var z = vertices[vertexCounter].z + (this.landscapeSize / 2);
        for (var jsonCounter = 0; jsonCounter < this.jsonHeightInformation.height.length; jsonCounter += 3)
        {
            var heightX = this.jsonHeightInformation.height[jsonCounter] ;
            var heightY = this.jsonHeightInformation.height[jsonCounter + 1] ;
            var heightZ = this.jsonHeightInformation.height[jsonCounter + 2] ;

            /* Match? */
            if ( (heightX == x) && (heightZ == z) )
            {
                vertices[vertexCounter].y = heightY ;
                break ;
            }
        }
    }


    /* SideNote : Planes are created in such a way that they run -(this.landscapeSize / 2) to +(this.landscapeSize / 2), so we need to alter the X,Y to bring them
     *            to the 0->100 range.. */
    for (var vertexCounter = 0; vertexCounter < vertices.length; vertexCounter++)
    {
        vertices[vertexCounter].x = vertices[vertexCounter].x + (this.tileSize / 2) ;
        vertices[vertexCounter].z = vertices[vertexCounter].z + (this.tileSize / 2) ;
    }


    threeMesh.position = this.position.clone() ;

    geo.verticesNeedUpdate = true;

    /* Recompute some things for clipping, ray casting, etc. */
    geo.computeBoundingSphere();
    geo.computeCentroids();
    geo.computeFaceNormals();

    /* Flags */
    this.meshLoaded = true ;
}

/**********************************************
 *
 * Function : isLoaded
 *
 * Description : Reports if the landscape is loaded or not
 *
 **********************************************/

LandscapeGridObject.prototype.isLoaded = function( )
{
    return this.meshLoaded ;
}



/***********************************************************************************************************************
 *                                          >>> TIMER / WORL TICK ROUTINES <<<
 ***********************************************************************************************************************/


/**********************************************
 *
 * Function : worldTick
 *
 * Description : worldTick
 *
 **********************************************/

LandscapeGridObject.prototype.worldTick = function( milliSecondsTick )
{
    this.timeMSElapsed += (milliSecondsTick / 1000);

}


/***********************************************************************************************************************
 *                                            >>> MISC SUPPORT ROUTINES <<<
 ***********************************************************************************************************************/

/**********************************************
 *
 * Function : getRawTHREEMesh
 *
 * Description : getRawTHREEMesh
 *
 **********************************************/

LandscapeGridObject.prototype.getRawTHREEMesh = function( )
{
    return this.meshObject.getRawTHREEMesh() ;
}


/**********************************************
 *
 * Function : getSplatTexture
 *
 * Description : getSplatTexture
 *
 **********************************************/

LandscapeGridObject.prototype.getSplatTexture = function( )
{
    return this.landscapeShaderUniforms.texture_splat.texture ;
}

LandscapeGridObject.prototype.setSplatTexture = function( splatTexture )
{
    this.landscapeShaderUniforms.texture_splat.texture.image = splatTexture ;
    this.landscapeShaderUniforms.texture_splat.texture.needsUpdate = true ;
}
