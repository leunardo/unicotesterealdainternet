drop database if exists db_topquizzes;
create database db_topquizzes;
use db_topquizzes;

create table usuario
(
	id_usuario 			   bigint unsigned not null auto_increment,
    id_google varchar(255)                         unique not null,
    nome varchar(255) 								      not null,
    descricao varchar(255) 								  not null,
	url_foto varchar(255)								  not null,
    pontuacao bigint									  not null,
    primary key(id_usuario)
);

create table modalidade
(
	id_modalidade bigint unsigned not null auto_increment,
    nome varchar(255)                   not null,
    primary key (id_modalidade)
);

insert into modalidade set nome = "pessoal";
insert into modalidade set nome = "pontuacao";
insert into modalidade set nome = "generica";

create table quiz 
(
	id_quiz bigint                 unsigned not null auto_increment,
    id_usuario bigint                             unsigned not null,
    id_modalidade bigint 				          unsigned not null,
    titulo varchar(255)					         	       not null,
    resumo varchar(255)					          		   not null,
    url_foto varchar(255)                                  not null,
    primary key(id_quiz)                                           ,
    foreign key(id_usuario) references usuario(id_usuario)         ,
    foreign key(id_modalidade) references modalidade(id_modalidade)    
);

create table top3
(
	id_top3 bigint unsigned not null auto_increment,
    id_usuario bigint unsigned not null,
    id_quiz bigint unsigned not null,
    posicao smallint,
    pontuacao int not null,
    primary key (id_top3),
    foreign key (id_usuario) references usuario(id_usuario),
    foreign key (id_quiz) references quiz(id_quiz)
);

create table pergunta
(
	id_pergunta bigint unsigned not null auto_increment,
    id_quiz bigint 					  unsigned not null,
    descricao varchar(255) 					   not null,
    nPergunta smallint unsigned not null,
    primary key (id_pergunta)
);

create table resposta
(
	id_resposta bigint 		unsigned not null auto_increment,
    id_pergunta bigint   				   unsigned not null,
    texto varchar(255) 								not null,
    nota bigint												,
    primary key(id_resposta)								,
    foreign key(id_pergunta) references pergunta(id_pergunta)
);

create table tag(
	id_tag bigint unsigned not null auto_increment,
    tag varchar(255) unique not null,
    primary key(id_tag)
);

create table quiztags(
	id_relacao bigint unsigned not null auto_increment,
    id_quiz bigint unsigned not null,
    id_tag bigint unsigned not null,
    primary key(id_relacao),
    foreign key(id_quiz) references quiz(id_quiz),
    foreign key(id_ftag) references tag(id_tag)
);

create table userquizzes(
    id_userquiz bigint unsigned not null auto_increment,
    id_quiz bigint unsigned not null,
    id_usuario bigint unsigned not null,
    primary key(id_userquiz),
    foreign key(id_quiz) references quiz(id_quiz),
    foreign key(id_usuario) references usuario(id_usuario)
);

create table resultado(
	id_resultado bigint unsigned not null auto_increment,
    id_quiz bigint unsigned not null,
    resultado varchar(255) not null,
    url_foto varchar(255) not null,
    pontuacaoMin int unsigned not null,
    pontuacaoMax int unsigned not null,
    primary key (id_resultado),
    foreign key (id_quiz) references quiz(id_quiz)
);

create table friendship(
	id_friendship bigint unsigned not null auto_increment,
    id_usuario bigint unsigned not null,
    id_usuario2 bigint unsigned not null,
    pendente boolean not null default true,
    primary key(id_friendship),
    foreign key(id_usuario) references usuario(id_usuario),
    foreign key(id_usuario2) references usuario(id_usuario),
    constraint id_friendship unique(id_usuario, id_usuario2)
);

drop view if exists db_topquizzes.v;
drop view if exists db_topquizzes.q;
drop view if exists db_topquizzes.qtq;
create view v as 
	select q.id_quiz, q.id_usuario, id_modalidade, titulo, resumo, q.url_foto, nome from
		usuario u inner join quiz q on q.id_usuario = u.id_usuario;
create view qtq as 
	select tag, t.id_tag, qt.id_quiz from quiztags qt inner join tag t on qt.id_tag = t.id_tag order by qt.id_quiz;
create view q as
	select v.nome, qtq.tag as tags, v.id_quiz, v.id_usuario, v.id_modalidade, v.titulo, v.resumo, v.url_foto, qtq.id_tag from 
		v left join
		qtq
		on qtq.id_quiz = v.id_quiz;
