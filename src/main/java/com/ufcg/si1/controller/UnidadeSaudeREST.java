package com.ufcg.si1.controller;


import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ufcg.si1.model.UnidadeSaude;
import com.ufcg.si1.service.UnidadeSaudeService;
import com.ufcg.si1.util.CustomErrorType;
import com.ufcg.si1.util.ObjWrapper;

import exceptions.ObjetoJaExistenteException;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UnidadeSaudeREST {
	@Autowired
	private UnidadeSaudeService unidadeSaudeService;

	@RequestMapping(value = "/especialidade/unidades", method = RequestMethod.GET)
	public ResponseEntity<Set> consultaEspecialidadeporUnidadeSaude(@RequestBody int codigoUnidadeSaude) {
		UnidadeSaude unidade = unidadeSaudeService.procura(codigoUnidadeSaude);
		if (unidade == null) {
			return new ResponseEntity<Set>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(unidade.getEspecialidades(), HttpStatus.OK);

	}
	

	@RequestMapping(value = "unidade/especialidade/{especialidade}", method = RequestMethod.GET)
	public ResponseEntity<List> getUnidadesPorEspecialidade(@PathVariable String especialidade) {
		
		List<UnidadeSaude> usList = unidadeSaudeService.getUnidadesPorEspecialidade(especialidade);
		return new ResponseEntity<>(usList, HttpStatus.OK);

	}

	@RequestMapping(value = "/unidade/", method = RequestMethod.GET)
	public ResponseEntity<?> getAllUnidades() {
		List<UnidadeSaude> unidadesSaude = unidadeSaudeService.getAll();
		if (unidadesSaude.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(unidadesSaude, HttpStatus.OK);

	}

	@RequestMapping(value = "/unidade/", method = RequestMethod.POST)
	public ResponseEntity<UnidadeSaude> incluirUnidadeSaude(@RequestBody UnidadeSaude us) {
		try {
			unidadeSaudeService.insere(us);
		} catch (ObjetoJaExistenteException e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(us ,HttpStatus.CREATED);
	}

	@RequestMapping(value = "/unidade/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> consultarUnidadeSaude(@PathVariable("id") long id) {

		UnidadeSaude unidade = unidadeSaudeService.procura(id);
		if (unidade == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(unidade, HttpStatus.OK);
	}

	@RequestMapping(value = "/geral/medicos/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> calcularMediaMedicoPacienteDia(@PathVariable("id") long id) {

		UnidadeSaude unidade = unidadeSaudeService.procura(id);

		if (unidade == null) {
			return new ResponseEntity<ObjWrapper<Double>>(HttpStatus.NOT_FOUND);
		}

		double result = unidade.getNumeroMedicos() / unidade.getNumeroPacientesDia();

		return new ResponseEntity<ObjWrapper<Double>>(new ObjWrapper<Double>(new Double(result)), HttpStatus.OK);
	}

	@RequestMapping(value = "/unidade/busca", method = RequestMethod.GET)
	public ResponseEntity<?> consultarUnidadeSaudePorBairro(
			@RequestParam(value = "bairro", required = true) String bairro) {

		UnidadeSaude unidade = unidadeSaudeService.findByBairro(bairro);
		if (unidade == null || !unidade.getBairro().equals(bairro)) {
			return new ResponseEntity(new CustomErrorType("Unidade with bairro " + bairro + " not found"),
					HttpStatus.NOT_FOUND);
		} 

		return new ResponseEntity<UnidadeSaude>(unidade, HttpStatus.OK);
	}
}
