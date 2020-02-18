<?php 
namespace AppBundle\Services;

class Helpers{

	public $manager;

	public function __construct($manager){
		$this->manager = $manager;
	}

	public function holaMundo(){
		return "Hola mundo desde mi servicio de symfony";
	}

	public function json($data){
		$normalizers = array(new \Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer());
		$enconders = array("json" => new \Symfony\Component\Serializer\Encoder\JsonEncoder());
		$serializer = new \Symfony\Component\Serializer\Serializer($normalizers, $enconders);
		$json  = $serializer->serialize($data,'json');

		$response = new \Symfony\Component\HttpFoundation\Response();
		$response->setContent($json);
		$response->headers->set('Content-Type', 'application/json');
		return $response;
	}
}
