<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Peticion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
/**
 * @OA\Info(
 *      version="1.0.0",
 *      x={
 *          "logo": {
 *              "url": "https://via.placeholder.com/190x90.png?text=L5-Swagger"
 *          }
 *      },
 *      title="L5 OpenApi",
 *      description="L5 Swagger OpenApi description",
 *      @OA\Contact(
 *          email=""
 *      ),
 *     @OA\License(
 *         name="Apache 2.0",
 *         url="https://www.apache.org/licenses/LICENSE-2.0.html"
 *     )
 * )
 */
class PeticionesController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/peticiones",
     *     summary="Mostrar usuarios",
     *     @OA\Response(
     *         response=200,
     *         description="Mostrar todos las peticiones."
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */
    public function index(Request $request)
    {
        $peticiones = Peticion::all();
        return $peticiones;
    }
    public function listMine(Request $request)
    {

        $user = Auth::user();

        $peticiones = Peticion::all()->where('user_id', $user->id);
        return $peticiones;
    }
    public function show(Request $request, $id)
    {
        $peticion = Peticion::findOrFail($id);
        return $peticion;
    }
    public function update(Request $request, $id)
    {
        $peticion = Peticion::findOrFail($id);
        $peticion->update($request->all());
        return $peticion;
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'titulo' => 'required|max:255',
                'descripcion' => 'required',
                'destinatario' => 'required',
                'category' => 'required',
            ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()],
                401);
        }
        $input = $request->all();
        $category = Category::findOrFail($input['category']);
        $peticion = new Peticion($input);
        $peticion->category()->associate($category);
        $peticion->firmantes = 0;
        $peticion->estado = 'pendiente';
        $peticion->user_id = Auth::user()->id;
        $peticion->save();

        return $peticion;
    }
    public function firmar(Request $request, $id)
    {
        try {
            $peticion = Peticion::findOrFail($id);
            $user = Auth::user();
            $firmas = $peticion->firmas;
            foreach ($firmas as $firma) {
                if ($firma->id == $user->id) {
                    return response()->json(['message' => 'No puedes firmar 2 veces la misma peticion'], 403);
                }
            }
            $user_id = [$user->id];
            $peticion->firmas()->attach($user_id);
            $peticion->firmantes = $peticion->firmantes + 1;
            $peticion->save();
        } catch (\Throwable$th) {
            return response()->json(['message' => 'Ha habido un error en el proceso'], 500);
        }
        return response()->json(['message' => 'Peticion firmada', 'peticion' => $peticion], 201);
    }
    public function cambiarEstado(Request $request, $id)
    {
        $peticion = Peticion::findOrFail($id);
        if ($peticion->estado != 'aceptada') {
            $peticion->estado = 'aceptada';
            $peticion->save();
            return response(["Message" => "El estado de la peticion ha cambiado a aceptada"], 200);
        }else{
            return response(["Message" => "La peticion no ha podido cambiar de estado"], 500);
        }


    }
    public function destroy(Request $request, $id)
    {
        $peticion = Peticion::findOrFail($id);
        $peticion->delete();
        return $peticion;
    }
    function list(Request $request) {
        $peticiones = Peticion::jsonPaginate();
        return $peticiones;
    }

}
