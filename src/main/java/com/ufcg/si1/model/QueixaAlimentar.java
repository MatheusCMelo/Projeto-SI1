package com.ufcg.si1.model;

import javax.persistence.Entity;

@Entity(name="QueixaAlimentar")
public class QueixaAlimentar extends Queixa {
	
	private String estabelecimento;
	
	public QueixaAlimentar() {
		super();
	}
	
	public QueixaAlimentar(long id, String descricao, String comentario, String nome, String email, String rua,
			String uf, String cidade, String estabelecimento) {
		super(id,descricao,comentario,nome,email,rua,uf,cidade);
		this.estabelecimento = estabelecimento;
	}

	public String getEstabelecimento() {
		return estabelecimento;
	}

	public void setEstabelecimento(String estabelecimento) {
		this.estabelecimento = estabelecimento;
	}
}
