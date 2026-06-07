'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bell, PlusCircle, Clock, User, FileText, ChevronRight, ShoppingCart, Wrench, Users } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import { Colors } from '../../lib/colors';
import { mockIdoso, mockRequests, mockNearbyVolunteers } from '../../lib/mock-data';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
};

const getStatusColor = (status) => {
  switch (status) {
    case 'em_progresso':
      return Colors.skyBlue;
    case 'aberto':
      return Colors.teal;
    case 'concluido':
      return Colors.success;
    default:
      return Colors.gray;
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'em_progresso':
      return 'EM PROGRESSO';
    case 'aberto':
      return 'ABERTO';
    case 'concluido':
      return 'CONCLUÍDO';
    default:
      return status.toUpperCase();
  }
};

const getCategoryIcon = (categoria) => {
  switch (categoria) {
    case 'compras':
      return <ShoppingCart className="w-5 h-5" />;
    case 'consertos':
    case 'reparos':
      return <Wrench className="w-5 h-5" />;
    case 'companhia':
      return <Users className="w-5 h-5" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) return days === 1 ? 'Ontem' : `Há ${days} dias`;
  if (hours > 0) return `Há ${hours}h`;
  return 'Agora';
};

export default function IdosoHomePage() {
  const user = mockIdoso;
  const allUserRequests = mockRequests.filter((r) => r.idosoId === user.id);

  const MenuCard = ({ icon, title, subtitle, href, gradient }) => (
    <Link
      href={href}
      className="flex items-center bg-white rounded-2xl p-4 border border-[#F5F5F5] shadow-sm hover:shadow-md transition-shadow"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={
          gradient
            ? { background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }
            : { backgroundColor: '#F5F5F5' }
        }
      >
        <span className={gradient ? 'text-white' : 'text-[#96C0BE]'}>{icon}</span>
      </div>
      <div className="flex-1 ml-4">
        <p className="text-base font-semibold text-[#1F2937]">{title}</p>
        <p className="text-[13px] text-[#9CA3AF]">{subtitle}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
    </Link>
  );

  const RequestCard = ({ request }) => (
    <Link href="/idoso/historico" className="block bg-white rounded-2xl p-4 border border-[#F5F5F5] hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${getStatusColor(request.status)}20` }}
        >
          <span style={{ color: getStatusColor(request.status) }}>
            {getCategoryIcon(request.categoria)}
          </span>
        </div>
        <div className="flex-1 ml-3">
          <p className="text-base font-semibold text-[#1F2937]">{request.titulo}</p>
          <p className="text-[13px] text-[#9CA3AF]">
            {formatDate(request.dataCriacao)}
            {request.voluntarioNome && ` • ${request.voluntarioNome}`}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
      </div>
      <div
        className="inline-block px-2.5 py-1 rounded-lg mt-3"
        style={{ backgroundColor: `${getStatusColor(request.status)}20` }}
      >
        <span className="text-[11px] font-bold" style={{ color: getStatusColor(request.status) }}>
          {getStatusLabel(request.status)}
        </span>
      </div>
    </Link>
  );

  return (
    <AppLayout userType="idoso" userName={user.nome} userPhoto={user.fotoPerfil}>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-5 pt-6 pb-4 bg-white border-b border-[#F5F5F5]">
        <div className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-7SEwUeLEtdk1FHrHeepM9P4BDpIYRE.png"
            alt="Holder"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="ml-2 text-xl font-bold text-[#96C0BE]">Holder</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center">
            <Bell className="w-6 h-6 text-[#1F2937]" />
          </button>
          <Link href="/idoso/perfil">
            <Image
              src={user.fotoPerfil}
              alt={user.nome}
              width={40}
              height={40}
              className="rounded-full border-2 border-[#F2BBA9]"
            />
          </Link>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between px-8 py-6 bg-white border-b border-[#F5F5F5]">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            {getGreeting()}, Sr. {user.nome.split(' ')[0]}!
          </h1>
          <p className="text-base text-[#9CA3AF]">Como podemos ajudar hoje?</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center">
          <Bell className="w-6 h-6 text-[#1F2937]" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 lg:p-8">
        {/* Mobile Greeting */}
        <div className="lg:hidden mb-6">
          <h1 className="text-[26px] font-bold text-[#1F2937] mb-1">
            {getGreeting()}, Sr. {user.nome.split(' ')[0]}!
          </h1>
          <p className="text-base text-[#9CA3AF]">Como podemos ajudar hoje?</p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Menu Cards and Requests */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <MenuCard
                icon={<PlusCircle className="w-6 h-6" />}
                title="Novo Pedido"
                subtitle="Compras, consertos ou companhia"
                href="/idoso/novo-pedido"
                gradient={Colors.gradientWarm}
              />
              <MenuCard
                icon={<Clock className="w-6 h-6" />}
                title="Meu Histórico"
                subtitle="Ver seus pedidos anteriores"
                href="/idoso/historico"
                gradient={Colors.gradientCool}
              />
              <MenuCard
                icon={<User className="w-6 h-6" />}
                title="Meu Perfil"
                subtitle="Dados e contatos de confiança"
                href="/idoso/perfil"
              />
            </div>

            {/* Active Requests */}
            <div className="bg-white rounded-2xl p-6 border border-[#F5F5F5]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#1F2937]" />
                  <span className="text-lg font-semibold text-[#1F2937]">Pedidos Ativos</span>
                </div>
                <Link href="/idoso/historico" className="text-sm font-medium text-[#96C0BE]">
                  Ver todos
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {allUserRequests.slice(0, 4).map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Community Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-[20px] p-6 border border-[#F5F5F5] text-center">
              <div className="w-full h-[140px] rounded-2xl bg-[#A4CCC1]/30 flex items-center justify-center mb-4">
                <Users className="w-[60px] h-[60px] text-[#96C0BE]" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-2">Comunidade Ativa</h3>
              <p className="text-sm text-[#9CA3AF] mb-5">
                Mais de <span className="text-[#96C0BE] font-semibold">{mockNearbyVolunteers.length} voluntários</span>{' '}
                por perto hoje!
              </p>
              <Link
                href="/idoso/voluntarios-proximos"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-base font-semibold text-white transition-opacity hover:opacity-90"
                style={{
                  background: `linear-gradient(to right, ${Colors.gradientCool[0]}, ${Colors.gradientCool[1]})`,
                }}
              >
                <Users className="w-5 h-5" />
                Ver Voluntários
              </Link>
            </div>

            {/* Stats Card - Desktop Only */}
            <div className="hidden lg:block bg-white rounded-[20px] p-6 border border-[#F5F5F5]">
              <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Suas Estatísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#9CA3AF]">Pedidos realizados</span>
                  <span className="text-lg font-bold text-[#1F2937]">{allUserRequests.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#9CA3AF]">Pedidos concluídos</span>
                  <span className="text-lg font-bold text-[#A4CCC1]">
                    {allUserRequests.filter((r) => r.status === 'concluido').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#9CA3AF]">Em andamento</span>
                  <span className="text-lg font-bold text-[#A5C3CB]">
                    {allUserRequests.filter((r) => r.status === 'em_progresso').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}